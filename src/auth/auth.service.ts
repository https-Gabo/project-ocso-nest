import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.userPassword, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      userPassword: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail,
      },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const match = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword,
    );

    if (!match) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = {
      userEmail: user.userEmail,
      userRoles: user.userRoles,
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
    const newUserData = await this.userRepository.preload({
      userEmail,
      ...updateUserDto,
    });

    if (!newUserData) {
      throw new NotFoundException(`User with email ${userEmail} not found`);
    }

    if (updateUserDto.userPassword) {
      newUserData.userPassword = await bcrypt.hash(
        updateUserDto.userPassword,
        10,
      );
    }

    return this.userRepository.save(newUserData);
  }
}
