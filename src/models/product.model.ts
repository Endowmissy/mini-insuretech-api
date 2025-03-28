import {
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { ProductCategory } from './productCategory.model';
import { Plan } from './plan.model';

@Table({ tableName: 'products', timestamps: false })
export class Product extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => ProductCategory)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  product_category_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  price: number;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  updated_at: Date;

  @BelongsTo(() => ProductCategory)
  productCategory: ProductCategory;

  @HasOne(() => Plan)
  plan: Plan;

  @BeforeCreate
  static generateUUID(instance: Product) {
    instance.id = uuidv4();
  }
}
