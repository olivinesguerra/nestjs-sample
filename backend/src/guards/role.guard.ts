import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRepository } from "../repository/user.respository";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private userRepository: UserRepository) { }

    matchRoles(roles: String[], userRole: String) {
        return roles.some((role) => role === userRole);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const userInfo = await this.userRepository.getById(req?.user?.sub);
        return this.matchRoles(roles, userInfo?.type);
    }
}