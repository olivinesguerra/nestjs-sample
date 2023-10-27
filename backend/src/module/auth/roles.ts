import { SetMetadata } from "@nestjs/common";
export const Roles = (...args: String[]) => SetMetadata("roles", args);