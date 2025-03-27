import { UserStatus } from '../enum/user.enum';
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
import { Wallet } from './wallet.model';
import { Policy } from './policy.model';
import { Plan } from './plan.model';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

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

  @Column({ type: DataType.DATE })
  created_at: Date;

  @Column({ type: DataType.DATE })
  updated_at: Date;

  @HasOne(() => Wallet)
  wallet: Wallet;

  @HasOne(() => Policy)
  policy: Policy;

  @HasOne(() => Plan)
  plan: Plan;

  // Automatically generate UUID before creating a user
  @BeforeCreate
  static generateUUID(instance: User) {
    instance.id = uuidv4();
  }
}
