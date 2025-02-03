import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from './dto/login.dto';
import {Public} from "./public";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Public() @Post('login') async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {
        if (!refreshToken) throw new UnauthorizedException('Refresh token is required');
        return this.authService.refreshToken(refreshToken);
    }

}