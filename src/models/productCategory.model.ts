import {
  BeforeCreate,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './product.model';

@Table({ tableName: 'product_categories', timestamps: false })
export class ProductCategory extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  updated_at: Date;

  @HasMany(() => Product)
  products: Product[];

  @BeforeCreate
  static generateUUID(instance: ProductCategory) {
    instance.id = uuidv4();
  }
}
