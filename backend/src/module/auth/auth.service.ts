import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserRepository } from "../../repository/user.respository";
import { LoginValidator, RegisterValidator } from "../auth/auth.validator";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userRespository: UserRepository
    ) { }

    async signIn(body: LoginValidator) {
        const user: any = await this.userRespository.getByEmailAndType(body?.email, body?.type)

        if (!user) {
            throw new NotFoundException("User not found.");
        }

        const tokens = await this.getTokens(user?.id, user.email);
        await this.updateRefreshToken(user?.id, tokens.refreshToken);
        const data = { user: user.get({ plain: true }), tokens }
        return data;
    }

    async signUp(body: RegisterValidator) {
        let user: any = await this.userRespository.getByEmailAndType(body?.email, body?.type)

        if (user) {
            throw new BadRequestException('User already exists');
        }

        const hash: string = await this.hashData(body.password);
        user = await this.userRespository.createUser(body?.email, hash, body?.type);
        const tokens = await this.getTokens(user?.id, user.email);
        await this.updateRefreshToken(user?.id, tokens.refreshToken);

        const data = { user: user.get({ plain: true }), tokens }
        return data;
    }



    async hashData(password: string) {
        console.log(bcrypt);
        console.log(password);
        return await bcrypt.hash(password, 10);
    }

    async checkPassword(password: string, hashPassword: string) {
        return await bcrypt.compare(password, hashPassword)
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.userRespository.updateUser(userId, {
            refreshToken: hashedRefreshToken,
        });
    }

    async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET || "",
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET || "",
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
};