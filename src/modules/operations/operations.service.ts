import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOperationDto, UpdateOperationDto } from 'src/common';
import { Operation, User } from 'src/providers/database';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
  ) {}

  getOperations(user: User): Promise<Operation[]> {
    return this.operationRepository.findBy({
      user: { id: user.id },
    });
  }

  async getOperation(id: string, user: User): Promise<Operation> {
    const operation = await this.operationRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!operation) {
      throw new NotFoundException(`Can't find operation with id ${id}`);
    }

    return operation;
  }

  async createOperation(
    dto: CreateOperationDto,
    user: User,
  ): Promise<Operation> {
    const operation = this.operationRepository.create({
      amount: dto.amount,
      operationType: dto.type,
      notes: dto.notes,
      currency: dto.currencyCode,
      account: { id: dto.accountId },
      category: { id: dto.categoryId },
      user,
    });

    try {
      await this.operationRepository.save(operation);
    } catch (err) {
      throw new BadRequestException('Ivalid operation configuration');
    }

    return operation;
  }

  async updateOperation(
    id: string,
    dto: UpdateOperationDto,
    user: User,
  ): Promise<Operation> {
    const operation = await this.operationRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!operation) {
      throw new NotFoundException(`Can't find operation with id ${id}`);
    }

    const updatedOperation = await this.operationRepository.save(
      this.operationRepository.merge(operation, dto),
    );

    return updatedOperation;
  }

  async deleteOperation(id: string, user: User): Promise<string> {
    await this.operationRepository.delete({ id, user: { id: user.id } });

    return id;
  }
}
