import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { ProductsModule } from 'src/products/products.module'
import { CommonModule } from 'src/commons/common.module'
import { SuppliersModule } from 'src/suppliers/suppliers.module'
import { UsersModule } from 'src/users/users.module'
import { QueueRedisModule } from 'src/queues/queue-redis.module'

@Module({
  imports: [ProductsModule, CommonModule, SuppliersModule, UsersModule, QueueRedisModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
