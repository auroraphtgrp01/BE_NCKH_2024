import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core'
import { CustomPrismaModule, PrismaClientExceptionFilter } from 'nestjs-prisma'
import { extendedPrismaClient } from './utils/prisma.extensions'
import { UsersModule } from './users/users.module'
import { SmartContractsModule } from './smart-contracts/smart-contracts.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ContractsModule } from './contracts/contracts.module'
import { InvitationsModule } from './invitations/invitations.module';
import { BullModule } from '@nestjs/bullmq'
import { QueueRedisModule } from './queues/queue-redis.module';
import { PartiesModule } from './parties/parties.module';
import { PartyInfosModule } from './party-infos/party-infos.module';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient
      },
      isGlobal: true
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT')
        }
      })
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    SmartContractsModule,
    AuthModule,
    ContractsModule,
    InvitationsModule,
    QueueRedisModule,
    PartiesModule,
    PartyInfosModule,
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
    // ContractDeployConsumerService
  ]
})
export class AppModule { }
