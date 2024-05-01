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
import { BullModule } from '@nestjs/bullmq'
import { QueueRedisModule } from './queues/queue-redis.module'
import { ContractAttributesModule } from './contract-attributes/contract-attributes.module'
import { ContractAttributeValuesModule } from './contract-attribute-values/contract-attribute-values.module'
import { TemplateContractsModule } from './template-contracts/template-contracts.module'
import { CommonModule } from './commons/common.module'
import { ParticipantsModule } from './participants/participants.module'
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { RolesModule } from './roles/roles.module';

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
    QueueRedisModule,
    ContractAttributesModule,
    ContractAttributeValuesModule,
    TemplateContractsModule,
    CommonModule,
    ParticipantsModule,
    ProductsModule,
    ImagesModule,
    RolesModule
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
    }
    // ContractDeployConsumerService
  ]
})
export class AppModule {}
