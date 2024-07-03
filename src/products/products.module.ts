import { Module, forwardRef } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { SuppliersModule } from 'src/suppliers/suppliers.module'

@Module({
  imports: [forwardRef(() => SuppliersModule)],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
