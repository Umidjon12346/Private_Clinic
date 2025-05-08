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
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";

@ApiTags("Appointments") // Controller uchun umumiy tag
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi uchrashuvni yaratish" })
  @ApiResponse({
    status: 201,
    description: "Uchrashuv muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Yaratishda xato" })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha uchrashuvlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha uchrashuvlar muvaffaqiyatli qaytarildi.",
  })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus uchrashuvni olish" })
  @ApiParam({ name: "id", description: "Uchrashuvning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Uchrashuv muvaffaqiyatli qaytarildi.",
  })
  @ApiResponse({ status: 404, description: "Uchrashuv topilmadi" })
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Uchrashuvni yangilash" })
  @ApiParam({ name: "id", description: "Uchrashuvning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Uchrashuv muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "Uchrashuv topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Uchrashuvni o‘chirish" })
  @ApiParam({ name: "id", description: "Uchrashuvning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Uchrashuv muvaffaqiyatli o‘chirildi.",
  })
  @ApiResponse({ status: 404, description: "Uchrashuv topilmadi" })
  remove(@Param("id") id: string) {
    return this.appointmentsService.remove(+id);
  }
}
