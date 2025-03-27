import {
  BeforeCreate,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './product.model';
import { User } from './user.model';
import { PendingPolicy } from './pendingPolicy';

@Table({ tableName: 'policies', timestamps: true, underscored: true })
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
    field: 'user_id',
  })
  userId: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'product_id',
  })
  productId: string;

  @ForeignKey(() => PendingPolicy)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'pending_policy_id',
  })
  pendingPolicyId: string;

  @Column({ type: DataType.STRING, allowNull: false, field: 'policy_number' })
  policyNumber: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BeforeCreate
  static generateUUID(instance: Policy) {
    instance.id = uuidv4();
  }
}
