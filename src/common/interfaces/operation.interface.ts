import { OperationType } from '../enums';

export interface Operation {
  amount: number;
  type: OperationType;
  category: string;
  notes?: string;
  createdAt: Date;
  id: string;
}
