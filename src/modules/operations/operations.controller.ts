import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOperationDto, UpdateOperationDto } from 'src/common';
import { OperationsService } from './operations.service';

@ApiTags('Operations')
@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get()
  getOperations() {
    return this.operationsService.getOperations();
  }

  @Get(':id')
  getOperation(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.operationsService.getOperation(id);
  }

  @Post()
  createOperation(@Body() dto: CreateOperationDto) {
    return this.operationsService.createOperation(dto);
  }

  @Put(':id')
  updateOperation(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateOperationDto,
  ) {
    return this.operationsService.updateOperation(id, dto);
  }

  @Delete(':id')
  deleteOperation(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.operationsService.deleteOperation(id);
  }
}
