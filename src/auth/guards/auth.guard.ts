import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Repository } from "typeorm";
import { JWT_KEY } from "../constans/jwt.constans";
import { User } from "../entities/user.entity";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractionTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Token not found");
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: JWT_KEY,
      });
      request["user"] = payload;
      request.user;
    } catch {
      throw new UnauthorizedException("Token not valid");
    }
    return true;
  }
  private extractionTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
