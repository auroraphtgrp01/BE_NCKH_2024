import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
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
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productsService.findAll(+page, +limit)
  }

  @Get('find-all-by-supplier/:supplierId')
  findAllBySupplierId(
    @Param('supplierId') supplierId: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.productsService.findAllBySupplierId(supplierId, +page, +limit)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id)
  }

  @Patch()
  update(@Body() updateProductDto: UpdateProductDto, @User() user: IUser) {
    return this.productsService.update(updateProductDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.productsService.remove(id, user)
  }
}
