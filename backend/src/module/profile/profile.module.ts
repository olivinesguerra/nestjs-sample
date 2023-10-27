import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { ProfileController } from './profile.controller';

import { User } from "../../models/user.entity";
import { ProfileService } from './profile.service';
import { UserRepository } from "../../repository/user.respository";
import { AuthService } from '../auth/auth.service';
@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.register({})
    ],
    controllers: [ProfileController],
    providers: [AuthService, ProfileService, UserRepository],
})
export class ProfileModule { }