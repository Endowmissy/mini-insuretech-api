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
import { User } from './user.model';

@Table({ tableName: 'users', timestamps: false })
export class Wallet extends Model {
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

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  balance: number;

  @Column({ type: DataType.DATE })
  created_at: Date;

  @Column({ type: DataType.DATE })
  updated_at: Date;

  @BelongsTo(() => User)
  user: User;

  @BeforeCreate
  static generateUUID(instance: Wallet) {
    instance.id = uuidv4();
  }
}
