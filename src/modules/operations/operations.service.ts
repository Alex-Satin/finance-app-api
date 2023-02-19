import { Injectable } from '@nestjs/common';

@Injectable()
export class OperationsService {
  private readonly operations = [];

  getOperations() {
    return this.operations;
  }
}
