import { Inject, Injectable } from '@nestjs/common'
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'

@Injectable()
export class SuppliersService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}

  create(createSupplierDto: CreateSupplierDto) {
    return 'This action adds a new supplier'
  }

  findAll() {
    return `This action returns all suppliers`
  }

  async findOneByid(id: string) {
    return await this.prismaService.client.suppliers.findUnique({ where: { id } })
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`
  }
}
