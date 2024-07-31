import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { SuppliersService } from './suppliers.service'
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { User } from 'src/decorators/user.decorator'

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto, @User() user: IUser) {
    return await this.suppliersService.create(createSupplierDto, user)
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    return await this.suppliersService.findAll(+page, +limit)
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.suppliersService.findOneById(id)
  }

  @Patch()
  update(@Body() updateSupplierDto: UpdateSupplierDto, @User() user: IUser) {
    return this.suppliersService.update(updateSupplierDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.suppliersService.remove(id, user)
  }
}
