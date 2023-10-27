import {
    Controller,
    Get,
    Put,
    UseGuards,
    Param,
    Post,
    Request,
    Body,
    Delete,
    Query
} from '@nestjs/common';
import { RoleGuard } from "../../guards/role.guard";
import { Roles } from "../auth/roles";

import { ProfileService } from "./profile.service";

import { AccessTokenGuard } from "../../guards/accessToken.guard"
import { UserType } from "../../util/constants";

@Controller("profiles")
export class ProfileController {
    constructor(
        private profileService: ProfileService
    ) { }

    // USER ENDPOINTS
    @Roles(UserType.Admin, UserType.User, UserType.Member)
    @UseGuards(AccessTokenGuard)
    @Get("me")
    async getById(@Request() req) {
        return await this.profileService.getMeUser(req?.user?.sub);
    }

    @Roles(UserType.Admin, UserType.User, UserType.Member)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Put(":id")
    async updateMe(@Request() req, @Body() body: any) {
        return await this.profileService.updateMeUser(req?.user?.sub, body);
    }

    // ADMIN ENDPOINTS
    @Roles(UserType.Admin)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Get("member")
    getList(@Query() query: any, @Request() req): any {
        // TODO - add pagination etc.
        return this.profileService.getAllMemberUnderAdmin(req?.user?.sub);
    }


    @Roles(UserType.Admin)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Put("member/:id")
    async updateMember(@Param() id: string, @Request() req, @Body() body: any) {
        return this.profileService.updateMember(id, req?.user?.sub, body);
    }

    @Roles(UserType.Admin)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Delete("member/:id")
    async deleteMemberByid(@Param() id: string, @Request() req) {
        return this.profileService.deleteMember(id, req?.user?.sub);
    }

    @Roles(UserType.Admin)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Post("member")
    createMember(@Body() body: any, @Request() req): any {
        return this.profileService.createMember(body, req?.user?.sub);
    }
}
