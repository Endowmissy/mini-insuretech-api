import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from '../models/wallet.model';
import { Transaction } from 'sequelize';

@Injectable()
export class WalletRepository {
  constructor(
    @InjectModel(Wallet) private readonly walletModel: typeof Wallet,
  ) {}

  async getUserWallet(
    user_id: string,
    transaction?: Transaction,
  ): Promise<Wallet> {
    return await this.walletModel.findOne({
      where: { user_id: user_id },
      transaction,
    });
  }

  async updateWalletBalance(
    user_id: string,
    newBalance: number,
    transaction: Transaction,
  ): Promise<any> {
    return await this.walletModel.update(
      {
        balance: newBalance,
      },
      { where: { user_id }, transaction },
    );
  }
}
