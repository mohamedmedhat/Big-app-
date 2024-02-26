import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "src/enums/userRole.enum";


export const ROLES_KEY = 'roles';
export const ROLES = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY,roles);