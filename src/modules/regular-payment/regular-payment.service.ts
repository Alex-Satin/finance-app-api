import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateRegularPaymentDto, UpdateRegularPaymentDto } from 'src/common';
import { RegularPayment } from 'src/common/interfaces/regular-payment.interface';

@Injectable()
export class RegularPaymentService {
  private regularPayments: RegularPayment[] = [];

  getRegularPayments() {
    return this.regularPayments;
  }

  getRegularPayment(id: string) {
    const regularPayment = this.regularPayments.find(
      (regularPayment) => regularPayment.id === id,
    );

    if (!regularPayment) {
      throw new NotFoundException(`Can't find regularPayment with id ${id}`);
    }

    return regularPayment;
  }

  createRegularPayment(dto: CreateRegularPaymentDto) {
    const regularPayment: RegularPayment = {
      ...dto,
      createdAt: new Date(),
      id: uuid(),
    };

    this.regularPayments.push(regularPayment);

    return regularPayment;
  }

  updateRegularPayment(id: string, dto: UpdateRegularPaymentDto) {
    const regularPaymentIndex = this.regularPayments.findIndex(
      (regularPayment) => regularPayment.id === id,
    );

    if (regularPaymentIndex === -1) {
      throw new NotFoundException(`Can't find regularPayment with id ${id}`);
    }

    this.regularPayments[regularPaymentIndex] = {
      ...this.regularPayments[regularPaymentIndex],
      ...dto,
    };

    return this.regularPayments[regularPaymentIndex];
  }

  deleteRegularPayment(id: string) {
    this.regularPayments = this.regularPayments.filter(
      (regularPayment) => regularPayment.id !== id,
    );

    return id;
  }
}
