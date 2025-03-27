import { UserStatus } from '../enum/user.enum';
import {
  BeforeCreate,
  Column,
  CreatedAt,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Wallet } from './wallet.model';
import { Policy } from './policy.model';

@Table({ tableName: 'users', timestamps: true, underscored: true })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, field: 'first_name' })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false, field: 'last_name' })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    defaultValue: UserStatus.ACTIVE,
    allowNull: false,
  })
  status: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @HasOne(() => Wallet)
  wallet: Wallet;

  @HasOne(() => Policy)
  policy: Policy;

  // Automatically generate UUID before creating a user
  @BeforeCreate
  static generateUUID(instance: User) {
    instance.id = uuidv4();
  }
}
