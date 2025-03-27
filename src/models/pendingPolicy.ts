import {
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Plan } from './plan.model';
import { Product } from './product.model';

@Table({ tableName: 'products', timestamps: false })
export class PendingPolicy extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Plan)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  plan_id: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  product_id: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_used: boolean;

  @Column({ type: DataType.DATE })
  created_at: Date;

  @Column({ type: DataType.DATE })
  updated_at: Date;

  @BelongsTo(() => Plan)
  plan: Plan;

  @BeforeCreate
  static generateUUID(instance: PendingPolicy) {
    instance.id = uuidv4();
  }
}
