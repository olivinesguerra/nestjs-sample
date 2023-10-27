import { Controller, Body, Post } from '@nestjs/common';
import { LoginValidator, RegisterValidator } from "./auth.validator";

import { AuthService } from "./auth.service";


@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("login")
    async login(@Body() body: LoginValidator) {
        return await this.authService.signIn(body);
    }

    @Post("register")
    async register(@Body() body: RegisterValidator) {
        return await this.authService.signUp(body);
    }
}
