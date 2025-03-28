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
import { Product } from './product.model';
import { User } from './user.model';
import { PendingPolicy } from './pendingPolicy.model';
import { Plan } from './plan.model';

@Table({ tableName: 'policies', timestamps: false })
export class Policy extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  user_id: string;

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

  @ForeignKey(() => PendingPolicy)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  pending_policy_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  policy_number: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  updated_at: Date;

  @BelongsTo(() => User)
  user: User;

  @BeforeCreate
  static generateUUID(instance: Policy) {
    instance.id = uuidv4();
  }
}
