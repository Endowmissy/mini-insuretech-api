import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Transaction } from 'sequelize';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async getUser(user_id: string, transaction: Transaction): Promise<User> {
    return await this.userModel.findOne({
      where: { id: user_id },
      transaction,
    });
  }
}
