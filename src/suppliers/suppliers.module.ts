import { Module, forwardRef } from '@nestjs/common'
import { SuppliersService } from './suppliers.service'
import { SuppliersController } from './suppliers.controller'
import { UsersController } from 'src/users/users.controller'
import { UsersModule } from 'src/users/users.module'
import { ProductsModule } from 'src/products/products.module'

@Module({
  imports: [UsersModule, forwardRef(() => ProductsModule)],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService]
})
export class SuppliersModule {}
