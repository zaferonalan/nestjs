import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    constructor(
        @Inject(refreshJwtConfig.KEY)
        private refreshJwtConfigurate: ConfigType<typeof refreshJwtConfig>,
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshJwtConfigurate.secret,
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: AuthJwtPayload) {
        const refreshToken = req.get('authorization')?.replace('Bearer ', '').trim();
        const userId = payload.sub;
        return this.authService.validateRefreshToken(userId, refreshToken);
    }
}
