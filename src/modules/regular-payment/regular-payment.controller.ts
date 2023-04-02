import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRegularPaymentDto, UpdateRegularPaymentDto } from 'src/common';
import { RegularPaymentService } from './regular-payment.service';

@ApiTags('Regular payments')
@Controller('regular-payment')
export class RegularPaymentController {
  constructor(private readonly regularPaymentService: RegularPaymentService) {}

  @Get()
  getRegularPayments() {
    return this.regularPaymentService.getRegularPayments();
  }

  @Get(':id')
  getRegularPayment(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.regularPaymentService.getRegularPayment(id);
  }

  @Post()
  createRegularPayment(@Body() dto: CreateRegularPaymentDto) {
    return this.regularPaymentService.createRegularPayment(dto);
  }

  @Put(':id')
  updateRegularPayment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateRegularPaymentDto,
  ) {
    return this.regularPaymentService.updateRegularPayment(id, dto);
  }

  @Delete(':id')
  deleteRegularPayment(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.regularPaymentService.deleteRegularPayment(id);
  }
}
