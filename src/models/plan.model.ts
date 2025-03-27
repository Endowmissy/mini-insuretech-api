import {
  BeforeCreate,
  Column,
  HasMany,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.model';
import { PendingPolicy } from './pendingPolicy';
import { Product } from './product.model';

@Table({ tableName: 'plans', timestamps: false })
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
  })
  user_id: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  product_id: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    defaultValue: 0,
  })
  total_amount: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  no_of_products: number;

  @Column({ type: DataType.DATE })
  created_at: Date;

  @Column({ type: DataType.DATE })
  updated_at: Date;

  @BelongsTo(() => Product)
  product: Product;

  @HasMany(() => PendingPolicy)
  pendingPolicies: PendingPolicy[];

  @BelongsTo(() => User)
  user: User[];

  @BeforeCreate
  static generateUUID(instance: Plan) {
    instance.id = uuidv4();
  }
}
