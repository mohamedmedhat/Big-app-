import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "../enums/userRole.enum";


export const ROLES_KEY = 'roles';
export const ROLES = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY,roles);