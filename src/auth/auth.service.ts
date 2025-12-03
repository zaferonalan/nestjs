import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import argon2 from '@node-rs/argon2';

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

    refreshToken(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const token = this.jwtService.sign(payload);

        return {
            id: userId,
            token,
        };
    }
}
