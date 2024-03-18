import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { CustomPrismaModule, PrismaClientExceptionFilter } from 'nestjs-prisma';
import { extendedPrismaClient } from './utils/prisma.extensions';
import { UsersModule } from './users/users.module';
import { SmartContractsModule } from './smart-contracts/smart-contracts.module';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient
      },
      isGlobal: true
    }),
    UsersModule,
    SmartContractsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter)
      },
      inject: [HttpAdapterHost]
    },
  ],
})
export class AppModule { }
