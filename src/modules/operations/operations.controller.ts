import { Controller, Get, NotFoundException } from '@nestjs/common';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get()
  getOperations() {
    throw new NotFoundException('Not found')
    return this.operationsService.getOperations();
  }
}
