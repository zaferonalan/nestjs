import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

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
}
