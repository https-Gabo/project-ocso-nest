import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Provider } from "./entities/provider.entity";
import { ProvidersController } from "./providers.controller";
import { ProvidersService } from "./providers.service";

describe("ProvidersController", () => {
  let controller: ProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersController],
      providers: [
        ProvidersService,
        {
          provide: getRepositoryToken(Provider),
          useValue: {},
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ProvidersController>(ProvidersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
