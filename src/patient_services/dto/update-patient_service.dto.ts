import { PartialType } from '@nestjs/swagger';
import { CreatePatientServiceDto } from './create-patient_service.dto';

export class UpdatePatientServiceDto extends PartialType(CreatePatientServiceDto) {}
