import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { User } from 'src/decorators/user.decorator'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @User() user: IUser) {
    return this.productsService.create(createProductDto, user)
  }

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Get('find-all-by-supplier/:supplierId')
  findAllBySupplierId(@Param('supplierId') supplierId: string) {
    return this.productsService.findAllBySupplierId(supplierId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id)
  }
}
