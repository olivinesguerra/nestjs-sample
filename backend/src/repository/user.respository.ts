import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { USER_TYPE } from "../util/enums";

import { User } from "../models/user.entity";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User) private user: typeof User) { }

    async getById(id, includePassword: boolean = false, includeToken: boolean = false) {
        let attributes = ["id", "email", "type"];

        if (includePassword) {
            attributes.push("password");
        }

        if (includeToken) {
            attributes.push("accessToken");
            attributes.push("refreshToken");
        }

        return this.user.findOne({ attributes, where: { id } })
    }

    async getByEmailAndType(email: string, type: USER_TYPE) {
        let attributes = ["id", "email", "type"];
        return this.user.findOne({ attributes, where: { email, type } });
    }

    async createUser(email: string, password: string, type: USER_TYPE) {
        return await this.user.create({ email, password, type });
    }

    async updateUser(id: string, data: any) {
        return (await this.user.findOne({ where: { id } })).update(data);
    }

    async deactivateUser(id: string) {
        return (await this.user.findOne({ where: { id } })).update({ isActive: false });
    }

    async activateUser(id: string) {
        return (await this.user.findOne({ where: { id } })).update({ isActive: true });
    }

    async getListOfMemberUnderAdminId(adminId: string) {
        return await this.user.findAll({ attributes: ["adminId", "id", "email", "isActive", "createdAt", "updatedAt"], where: { adminId: adminId }});
    }

}