import {ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import {LoginDto} from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService,) {
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByUsername(loginDto.username);
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new ForbiddenException('Invalid credentials');
        }
        const payload = {username: user.username, userId: user._id, isAdmin: user.isAdmin};
        const access_token = this.jwtService.sign(payload, {expiresIn: '15m'})
        const refresh_token = this.jwtService.sign(payload, {expiresIn: '1d'});

        return {access_token, refresh_token};
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            return {
                access_token: this.jwtService.sign({ userId: payload.userId, username: payload.username, isAdmin: payload.isAdmin }, { expiresIn: '15m' }),
                refresh_token: this.jwtService.sign({ userId: payload.userId, username: payload.username, isAdmin: payload.isAdmin }, { expiresIn: '1d' })
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}