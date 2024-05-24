import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { ProductsModule } from 'src/products/products.module'
import { CommonModule } from 'src/commons/common.module'
import { SuppliersModule } from 'src/suppliers/suppliers.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [ProductsModule, CommonModule, SuppliersModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
