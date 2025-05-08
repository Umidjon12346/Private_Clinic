import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './models/service.model';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service) private readonly serviceModel: typeof Service
  ) {}

  create(createServiceDto: CreateServiceDto) {
    return this.serviceModel.create(createServiceDto);
  }

  findAll() {
    return this.serviceModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.serviceModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const [count, updated] = await this.serviceModel.update(updateServiceDto, {
      where: { id },
      returning: true,
    });
    return count > 0 ? updated[0] : null;
  }

  async remove(id: number) {
    const deleted = await this.serviceModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "ochib olib kettii";
    }
    return "ochirmaaaa";
  }
}
