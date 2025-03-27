import {
  BeforeCreate,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Plan } from './plan.model';
import { Product } from './product.model';

@Table({ tableName: 'plan_products', timestamps: true, underscored: true })
export class PlanProduct extends Model {
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
    field: 'plan_id',
  })
  planId: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'product_id',
  })
  productId: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @BeforeCreate
  static generateUUID(instance: PlanProduct) {
    instance.id = uuidv4();
  }
}
