import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { WinstonModule } from 'nest-winston';
import logger from './config/logger';

@Module({
  imports: [
    SequelizeModule.forRoot({ ...databaseConfig }),
    WinstonModule.forRoot(logger),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
