import { Injectable } from '@nestjs/common';
import { CreatePatientServiceDto } from './dto/create-patient_service.dto';
import { UpdatePatientServiceDto } from './dto/update-patient_service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PatientService } from './models/patient_service.model';

@Injectable()
export class PatientServicesService {
  constructor(
    @InjectModel(PatientService)
    private readonly patientServiceModel: typeof PatientService
  ) {}
  create(createPatientServiceDto: CreatePatientServiceDto) {
    return this.patientServiceModel.create(createPatientServiceDto);
  }

  findAll() {
    return this.patientServiceModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.patientServiceModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updatePatientServiceDto: UpdatePatientServiceDto) {
    const [count, updated] = await this.patientServiceModel.update(updatePatientServiceDto, {
      where: { id },
      returning: true,
    });
    return count > 0 ? updated[0] : null;
  }

  async remove(id: number) {
    const deleted = await this.patientServiceModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "ochib olib kettii";
    }
    return "ochirmaaaa";
  }
}
