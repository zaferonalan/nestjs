import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import argon2 from '@node-rs/argon2';
import { CurrentUser } from './types/current-user';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY)
        private refreshTonkenConfig: ConfigType<typeof refreshJwtConfig>,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        const fakeHash = '$2b$10$fakehashforsecurityaaaaaaaaaaaaaa';
        const hashToCompare = user?.password || fakeHash;

        const isPasswordMatch = await compare(password, hashToCompare);

        if (!user || !isPasswordMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return { id: user.id };
    }

    async login(userId: number) {
        // const payload: AuthJwtPayload = { sub: userId };
        // const token = this.jwtService.sign(payload);
        // const refreshToken = this.jwtService.sign(payload, this.refreshTonkenConfig);

        const { accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);

        return {
            id: userId,
            accessToken,
            refreshToken,
        };
    }

    async generateTokens(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTonkenConfig),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(userId: number) {
        const { accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);

        return {
            id: userId,
            accessToken,
            refreshToken,
        };
    }

    async validateRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException('Invalid Refresh Token');
        }

        const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken);

        if (!refreshTokenMatches) {
            throw new UnauthorizedException('Invalid Refresh Token');
        }

        return { id: userId };
    }

    async singOut(userId: number) {
        await this.userService.updateHashedRefreshToken(userId, null);
    }

    async validateJwtUser(userId: number) {
        const user = await this.userService.findOne(userId);
        if (!user) throw new UnauthorizedException('User not Found!');
        const currentUser: CurrentUser = { id: user.id, role: user.role };
        return currentUser;
    }
}
