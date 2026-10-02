import { applyDecorators, UseGuards } from "@nestjs/common";
import { ROLES } from "../constans/roles.constans";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";

export const Auth = (...roles: ROLES[]) => {
  roles.push(ROLES.ADMIN);
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
};
