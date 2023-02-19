import { OperationType } from '../enums';

export class CreateOperationDto {
  amount: number;
  type: OperationType;
  category: string;
  notes?: string;
}
