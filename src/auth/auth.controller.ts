import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedRequestZodDto } from './dto/login-request.dto';
import { LocalAuthGuard } from './guards/local-auth/local-guard.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req: AuthenticatedRequestZodDto) {
        // const token = this.authService.login(req.user.id);
        // return {
        //     message: 'Login Successfully',
        //     user: req.user.id,
        //     token,
        // };
        return this.authService.login(req.user.id);
    }
}
