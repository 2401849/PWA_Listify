import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt-auth-guard";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [{
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    },]
})
export class AppModule {}
