import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
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
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
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
