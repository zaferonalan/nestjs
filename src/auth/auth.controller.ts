import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedRequestZodDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req: AuthenticatedRequestZodDto) {
        return {
            message: 'Login Successfully',
            user: req.user,
        };
    }
}
