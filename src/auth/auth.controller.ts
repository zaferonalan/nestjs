import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthenticatedRequestZodDto } from './dto/login-request.dto';
import { LocalAuthGuard } from './guards/local-auth/local-guard.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Public()
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

    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    refreshToken(@Request() req: AuthenticatedRequestZodDto) {
        return this.authService.refreshToken(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('signout')
    async signOut(@Request() req: AuthenticatedRequestZodDto) {
        await this.authService.singOut(req.user.id);
    }
}
