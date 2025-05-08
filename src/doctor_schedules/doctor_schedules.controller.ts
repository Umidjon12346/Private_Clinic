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
import { DoctorSchedulesService } from "./doctor_schedules.service";
import { CreateDoctorScheduleDto } from "./dto/create-doctor_schedule.dto";
import { UpdateDoctorScheduleDto } from "./dto/update-doctor_schedule.dto";

@ApiTags("Doctor Schedules") // Controller uchun umumiy tag
@Controller("doctor-schedules")
export class DoctorSchedulesController {
  constructor(
    private readonly doctorSchedulesService: DoctorSchedulesService
  ) {}

  @Post()
  @ApiOperation({ summary: "Yangi shifokor jadvalini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Shifokor jadvali muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Yaratishda xato" })
  create(@Body() createDoctorScheduleDto: CreateDoctorScheduleDto) {
    return this.doctorSchedulesService.create(createDoctorScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha shifokor jadvalini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha shifokor jadvali muvaffaqiyatli qaytarildi.",
  })
  findAll() {
    return this.doctorSchedulesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus shifokor jadvalini olish" })
  @ApiParam({ name: "id", description: "Shifokor jadvalining ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Shifokor jadvali muvaffaqiyatli qaytarildi.",
  })
  @ApiResponse({ status: 404, description: "Shifokor jadvali topilmadi" })
  findOne(@Param("id") id: string) {
    return this.doctorSchedulesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Shifokor jadvalini yangilash" })
  @ApiParam({ name: "id", description: "Shifokor jadvalining ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Shifokor jadvali muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "Shifokor jadvali topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateDoctorScheduleDto: UpdateDoctorScheduleDto
  ) {
    return this.doctorSchedulesService.update(+id, updateDoctorScheduleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Shifokor jadvalini o‘chirish" })
  @ApiParam({ name: "id", description: "Shifokor jadvalining ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Shifokor jadvali muvaffaqiyatli o‘chirildi.",
  })
  @ApiResponse({ status: 404, description: "Shifokor jadvali topilmadi" })
  remove(@Param("id") id: string) {
    return this.doctorSchedulesService.remove(+id);
  }
}
