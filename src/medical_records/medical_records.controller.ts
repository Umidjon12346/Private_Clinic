import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { MedicalRecordsService } from "./medical_records.service";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";
import { SelfPatientGuard } from "../common/guards/patient.self.guard";
import { IsPatientGuard } from "../common/guards/is.patient.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsDoctorGuard } from "../common/guards/is.doctor.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";

@ApiTags("Medical Records") // Controller uchun umumiy tag
@Controller("medical-records")
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi tibbiy yozuvni yaratish" })
  @ApiResponse({
    status: 201,
    description: "Tibbiy yozuv muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Yaratishda xato" })
  @UseGuards(IsDoctorGuard)
  @UseGuards(AuthGuard)
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha tibbiy yozuvlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha tibbiy yozuvlar muvaffaqiyatli qaytarildi.",
  })
  @UseGuards(IsDoctorGuard)
  @UseGuards(AuthGuard)
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus tibbiy yozuvni olish" })
  @ApiParam({ name: "id", description: "Tibbiy yozuvning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Tibbiy yozuv muvaffaqiyatli qaytarildi.",
  })
  @ApiResponse({ status: 404, description: "Tibbiy yozuv topilmadi" })
  @UseGuards(SelfPatientGuard)
  @UseGuards(IsPatientGuard)
  @UseGuards(AuthGuard)
  findOne(@Param("id") id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Tibbiy yozuvni yangilash" })
  @ApiParam({ name: "id", description: "Tibbiy yozuvning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Tibbiy yozuv muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "Tibbiy yozuv topilmadi" })
  @UseGuards(IsDoctorGuard)
  @UseGuards(AuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
  ) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tibbiy yozuvni o‘chirish" })
  @ApiParam({ name: "id", description: "Tibbiy yozuvning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Tibbiy yozuv muvaffaqiyatli o‘chirildi.",
  })
  @ApiResponse({ status: 404, description: "Tibbiy yozuv topilmadi" })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  remove(@Param("id") id: string) {
    return this.medicalRecordsService.remove(+id);
  }
}
