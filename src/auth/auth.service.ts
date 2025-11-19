import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';

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

    login(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const token = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, this.refreshTonkenConfig);

        return {
            id: userId,
            token,
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
