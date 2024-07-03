import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { IExecutor } from 'src/interfaces/executor.interface'
import { ERoles } from 'src/constants/enum.constant'
import { Suppliers, User } from '@prisma/client'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { UsersService } from 'src/users/users.service'
import { ProductsService } from 'src/products/products.service'

@Injectable()
export class SuppliersService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private userService: UsersService,
    @Inject(forwardRef(() => ProductsService)) private readonly productsService: ProductsService
  ) {}

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
      suppliers.push({ ...supplier, images })
    }
    return suppliers
  }

  async findOneByUniqueField(value: string, excludeId?: string) {
    const condition = excludeId
      ? { id: { not: excludeId }, OR: [{ taxCode: value }, { email: value }, { phoneNumber: value }] }
      : { OR: [{ taxCode: value }, { email: value }, { phoneNumber: value }] }
    const supplier = await this.prismaService.client.suppliers.findFirst({
      where: condition
    })
    return supplier
  }

  async findAllByUserId(userId: string) {
    const suppliers = await this.prismaService.client.suppliers.findMany({ where: { userId } })
    return suppliers
  }

  async findOneById(id: string): Promise<Suppliers & { images: string[]; User: User }> {
    const suppliers: any = await this.prismaService.client.suppliers.findUnique({
      where: { id },
      include: { User: true }
    })

    suppliers.images =
      (await this.prismaService.client.images.count({ where: { suppliersId: id } })) > 0
        ? await this.prismaService.client.images.findMany({ where: { suppliersId: id } })
        : []
    return suppliers
  }

  async findOne(id: string) {
    return await this.prismaService.client.suppliers.findUnique({ where: { id } })
  }

  async update(updateSupplierDto: UpdateSupplierDto, user: IUser) {
    try {
      const findSupplier = await this.findOne(updateSupplierDto.id)
      if (!findSupplier) throw new NotFoundException({ message: RESPONSE_MESSAGES.SUPPLIER_IS_NOT_FOUND })
      const updatedBy: IExecutor = { id: user.id, role: user.role, email: user.email, name: user.name }
      const { images, userId } = updateSupplierDto
      const updateData: any = { ...updateSupplierDto, updatedBy }
      if (images) {
        console.log('Update images')
      }

      if (userId) {
        if ((await this.userService.findOneById(userId)) === null)
          throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
        else updateData.User = { connect: { id: userId } }
      }

      if (
        (!updateData.taxCode ||
          (await this.findOneByUniqueField(updateSupplierDto.taxCode, updateSupplierDto.id)) !== null) &&
        (!updateData.email ||
          (await this.findOneByUniqueField(updateSupplierDto.email, updateSupplierDto.id)) !== null) &&
        (!updateData.phoneNumber ||
          (await this.findOneByUniqueField(updateSupplierDto.phoneNumber, updateSupplierDto.id)) !== null)
      )
        throw new NotFoundException({ message: RESPONSE_MESSAGES.TAX_CODE_OR_EMAIL_OR_PHONE_NUMBER_IS_EXISTED })

      const supplier = await this.prismaService.client.suppliers.update({
        where: { id: updateSupplierDto.id },
        data: {
          ...updateData
        }
      })
      return supplier
    } catch (error) {
      throw error
    }
  }

  async remove(id: string, user: IUser) {
    if (!(await this.findOne(id))) throw new NotFoundException({ message: RESPONSE_MESSAGES.SUPPLIER_IS_NOT_FOUND })
    const deletedBy: IExecutor = { id: user.id, role: user.role, email: user.email, name: user.name }
    await Promise.all([
      this.productsService.removeAllBySupplierId(id, user),
      this.prismaService.client.suppliers.update({ where: { id }, data: { deletedBy } }),
      this.prismaService.client.suppliers.delete({ where: { id } })
    ])

    return { message: RESPONSE_MESSAGES.SUPPLIER_REMOVED }
  }
}
