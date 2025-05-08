import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { PatientServicesService } from "./patient_services.service";
import { CreatePatientServiceDto } from "./dto/create-patient_service.dto";
import { UpdatePatientServiceDto } from "./dto/update-patient_service.dto";

@ApiTags("Patient Services") // Controller uchun umumiy tag
@Controller("patient-services")
export class PatientServicesController {
  constructor(
    private readonly patientServicesService: PatientServicesService
  ) {}

  @Post()
  @ApiOperation({ summary: "Yangi bemor xizmatini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Bemor xizmati muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Yaratishda xato" })
  create(@Body() createPatientServiceDto: CreatePatientServiceDto) {
    return this.patientServicesService.create(createPatientServiceDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bemor xizmatlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha bemor xizmatlari muvaffaqiyatli qaytarildi.",
  })
  findAll() {
    return this.patientServicesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus bemor xizmatini olish" })
  @ApiParam({ name: "id", description: "Bemor xizmatining ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Bemor xizmati muvaffaqiyatli qaytarildi.",
  })
  @ApiResponse({ status: 404, description: "Bemor xizmati topilmadi" })
  findOne(@Param("id") id: string) {
    return this.patientServicesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Bemor xizmatini yangilash" })
  @ApiParam({ name: "id", description: "Bemor xizmatining ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Bemor xizmati muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "Bemor xizmati topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updatePatientServiceDto: UpdatePatientServiceDto
  ) {
    return this.patientServicesService.update(+id, updatePatientServiceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Bemor xizmatini o‘chirish" })
  @ApiParam({ name: "id", description: "Bemor xizmatining ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Bemor xizmati muvaffaqiyatli o‘chirildi.",
  })
  @ApiResponse({ status: 404, description: "Bemor xizmati topilmadi" })
  remove(@Param("id") id: string) {
    return this.patientServicesService.remove(+id);
  }
}
