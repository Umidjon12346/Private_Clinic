import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical_record.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical_record.model';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord)
    private readonly medicalRecordModel: typeof MedicalRecord
  ) {}

  create(createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordModel.create(createMedicalRecordDto);
  }

  findAll() {
    return this.medicalRecordModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.medicalRecordModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const [count, updated] = await this.medicalRecordModel.update(updateMedicalRecordDto, {
      where: { id },
      returning: true,
    });
    return count > 0 ? updated[0] : null;
  }

  async remove(id: number) {
    const deleted = await this.medicalRecordModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "ochib olib kettii";
    }
    return "ochirmaaaa";
  }
}
