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
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@ApiTags("Payments") // Controller uchun umumiy tag
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi to‘lov yaratish" })
  @ApiResponse({ status: 201, description: "To‘lov muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Yaratishda xato" })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha to‘lovlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha to‘lovlar muvaffaqiyatli qaytarildi.",
  })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus to‘lovni olish" })
  @ApiParam({ name: "id", description: "To‘lovning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "To‘lov muvaffaqiyatli qaytarildi.",
  })
  @ApiResponse({ status: 404, description: "To‘lov topilmadi" })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "To‘lovni yangilash" })
  @ApiParam({ name: "id", description: "To‘lovning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "To‘lov muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "To‘lov topilmadi" })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "To‘lovni o‘chirish" })
  @ApiParam({ name: "id", description: "To‘lovning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "To‘lov muvaffaqiyatli o‘chirildi.",
  })
  @ApiResponse({ status: 404, description: "To‘lov topilmadi" })
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
