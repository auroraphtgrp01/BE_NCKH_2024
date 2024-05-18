import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { IExecutor } from 'src/interfaces/executor.interface'
import { ERoles } from 'src/constants/enum.constant'

@Injectable()
export class SuppliersService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}

  async create(createSupplierDto: CreateSupplierDto, user: IUser) {
    if (user.role !== ERoles.SUPPLIER) throw new ForbiddenException('You are not allowed to create a supplier')
    const createdBy: IExecutor = { id: user.id, role: user.role, email: user.email, name: user.name }
    const supplier = await this.prismaService.client.suppliers.create({
      data: {
        ...createSupplierDto,
        User: {
          connect: {
            id: user.id
          }
        },
        createdBy,
        updatedAt: null
      }
    })
    return supplier
  }

  async findAll() {
    const suppliers = []
    const spl = await this.prismaService.client.suppliers.findMany({ include: { User: true } })
    for (const supplier of spl) {
      const images = await this.prismaService.client.images.findMany({ where: { suppliersId: supplier.id } })
      suppliers.push({ supplier, images })
    }
    return suppliers
  }

  async findOneById(id: string) {
    const suppliers: any = await this.prismaService.client.suppliers.findUnique({
      where: { id },
      include: { User: true }
    })
    suppliers.images = await this.prismaService.client.images.findMany({ where: { suppliersId: suppliers.id } })
    return suppliers
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
