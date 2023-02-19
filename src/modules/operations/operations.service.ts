import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateOperationDto, Operation, UpdateOperationDto } from 'src/common';

@Injectable()
export class OperationsService {
  private operations: Operation[] = [];

  getOperations() {
    return this.operations;
  }

  getOperation(id: string) {
    const operation = this.operations.find((operation) => operation.id === id);

    if (!operation) {
      throw new NotFoundException(`Can't find operation with id ${id}`);
    }

    return operation;
  }

  createOperation(dto: CreateOperationDto) {
    const operation: Operation = {
      ...dto,
      createdAt: new Date(),
      id: uuid(),
    };

    this.operations.push(operation);

    return operation;
  }

  updateOperation(id: string, dto: UpdateOperationDto) {
    const operationIndex = this.operations.findIndex(
      (operation) => operation.id === id,
    );

    if (operationIndex === -1) {
      throw new NotFoundException(`Can't find operation with id ${id}`);
    }

    this.operations[operationIndex] = {
      ...this.operations[operationIndex],
      ...dto,
    };

    return this.operations[operationIndex];
  }

  deleteOperation(id: string) {
    this.operations = this.operations.filter(
      (operation) => operation.id !== id,
    );

    return id;
  }
}
