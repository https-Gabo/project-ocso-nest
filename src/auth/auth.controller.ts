import { Body, Controller, Get, Param, Patch, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { AuthService } from "./auth.service";
import { TOKEN_NAME } from "./constans/jwt.constans";
import { ROLES } from "./constans/roles.constans";
import { Auth } from "./decorators/auth.decorator";
import { UserData } from "./decorators/user.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.authService.loginUser(loginUserDto);
    response.cookie(TOKEN_NAME, res.token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    return res;
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get("profile")
  getProfile(@UserData() user: Pick<User, "userEmail" | "userRoles">) {
    return user;
  }

  @Patch("/:email")
  updateUser(
    @Param("email") userEmail: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}
