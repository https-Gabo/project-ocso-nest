import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { Provider } from "./entities/provider.entity";

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}
  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find();
  }

  findOne(id: string) {
    return this.providerRepository.findOneBy({
      providerId: id,
    });
  }

  async findOneByName(name: string) {
    const providers = await this.providerRepository.findBy({
      providerName: Like(`%${name}%`),
    });
    if (providers.length === 0) throw new NotFoundException();
    return providers;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });
    if (!provider)
      throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
    return this.providerRepository.save(provider);
  }

  async remove(id: string) {
    const result = await this.providerRepository.delete({
      providerId: id,
    });
    if (result.affected === 0)
      throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
    return { message: `Proveedor con id ${id} eliminado` };
  }
}
