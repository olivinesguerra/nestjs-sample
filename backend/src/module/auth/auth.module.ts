import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { AccessTokenStrategy } from './accessToken.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';

import { UserRepository } from "../../repository/user.respository";
import { User } from "../../models/user.entity";

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, UserRepository],
})
export class AuthModule { }