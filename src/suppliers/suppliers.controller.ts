import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
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
  findAll() {
    return this.suppliersService.findAll()
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.suppliersService.findOneById(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(+id, updateSupplierDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id)
  }
}
