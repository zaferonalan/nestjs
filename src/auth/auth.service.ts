import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
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
        return this.jwtService.sign(payload);
    }
}
