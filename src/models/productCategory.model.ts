import {
  BeforeCreate,
  Column,
  CreatedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './product.model';

@Table({ tableName: 'product_categories', timestamps: true, underscored: true })
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

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @HasMany(() => Product)
  product: Product[];

  @BeforeCreate
  static generateUUID(instance: ProductCategory) {
    instance.id = uuidv4();
  }
}
