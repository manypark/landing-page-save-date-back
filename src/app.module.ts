import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserRegister } from './entities/user-register.entity';

@Module({
  imports     : [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type        : 'postgres',
      host        : process.env.DB_HOST,
      port        : +process.env.DB_PORT,
      database    : process.env.DB_NAME,
      username    : process.env.DB_USERNAME,
      password    : process.env.DB_PASSWORD,
      synchronize : true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([ UserRegister ]),
  ],
  controllers : [
    AppController
  ],
  providers   : [
    AppService
  ],
})

export class AppModule {}
