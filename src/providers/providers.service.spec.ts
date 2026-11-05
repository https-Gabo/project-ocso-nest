import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Provider } from "./entities/provider.entity";
import { ProvidersService } from "./providers.service";

describe("ProvidersService", () => {
  let service: ProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvidersService,
        {
          provide: getRepositoryToken(Provider),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProvidersService>(ProvidersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
