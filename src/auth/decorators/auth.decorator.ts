import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ROLES } from "../constans/roles.constans";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ApiAuth } from "./api.decorator";
import { Roles } from "./roles.decorator";

export const Auth = (...roles: ROLES[]) => {
  const allowedRoles = [...roles, ROLES.ADMIN];
  return applyDecorators(
    ApiBearerAuth(),
    ApiAuth(),
    Roles(allowedRoles),
    UseGuards(AuthGuard, RolesGuard),
  );
};
