import { Controller, Get } from '@nestjs/common';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get()
  getOperations() {
    return this.operationsService.getOperations();
  }
}
