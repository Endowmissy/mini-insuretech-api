import {
  BeforeCreate,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.model';
import { PendingPolicy } from './pendingPolicy';

@Table({ tableName: 'plans', timestamps: true, underscored: true })
export class Plan extends Model {
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

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    defaultValue: 0,
    field: 'total_amount',
  })
  totalAmount: number;

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'no_of_products' })
  noOfProducts: number;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => PendingPolicy)
  pendingPolicies: PendingPolicy[];

  @BeforeCreate
  static generateUUID(instance: Plan) {
    instance.id = uuidv4();
  }
}
