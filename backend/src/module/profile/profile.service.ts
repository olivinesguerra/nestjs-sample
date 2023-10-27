import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { UserRepository } from "../../repository/user.respository";
import { UserType } from "../../util/constants";

@Injectable()
export class ProfileService {
    constructor(
        private userRespository: UserRepository,
        private authService: AuthService
    ) { }

    async getMeUser(id: string) {
        return this.userRespository.getById(id, false, false);
    }

    async updateMeUser(id: string, body: any) {
        return this.userRespository.updateUser(id, body);
    }

    async createMember(body: any, adminId: string) {
        const temp = { ...body };
        temp.password = "TempPassword2023";
        temp.type = UserType.Member;
        temp.adminId = adminId;
        return this.authService.signUp(temp);
    }

    async deleteMember(id: string, adminId: string) {
        // TODO - Check if member is under admin
        return this.userRespository.deactivateUser(id);
    }

    async updateMember(id: string, adminId: string, body: any) {
        // TODO - Check if member is under admin
        return this.userRespository.updateUser(id, body)
    }

    async getAllMemberUnderAdmin(adminId: string) {
        return this.userRespository.getListOfMemberUnderAdminId(adminId);
    }
};