import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateOperationDto,
  GetUser,
  JwtAuthGuard,
  UpdateOperationDto,
} from 'src/common';
import { OperationsService } from './operations.service';
import { User } from 'src/providers/database';

@ApiTags('Operations')
@UseGuards(JwtAuthGuard)
@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get()
  getOperations(@GetUser() user: User) {
    return this.operationsService.getOperations(user);
  }

  @Get(':id')
  getOperation(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ) {
    return this.operationsService.getOperation(id, user);
  }

  @Post()
  createOperation(@Body() dto: CreateOperationDto, @GetUser() user: User) {
    return this.operationsService.createOperation(dto, user);
  }

  @Put(':id')
  updateOperation(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateOperationDto,
    @GetUser() user: User,
  ) {
    return this.operationsService.updateOperation(id, dto, user);
  }

  @Delete(':id')
  deleteOperation(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ) {
    return this.operationsService.deleteOperation(id, user);
  }
}
