import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { IExecutor } from 'src/interfaces/executor.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { SuppliersService } from 'src/suppliers/suppliers.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => SuppliersService)) private readonly suppliersService: SuppliersService
  ) {}
  async create(createProductDto: CreateProductDto, user: IUser) {
    if (!(await this.suppliersService.findOneById(createProductDto.supplierId)))
      throw new NotFoundException('Supplier not found')
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const { supplierId, ...rest } = createProductDto
    return await this.prismaService.client.products.create({
      data: { ...rest, Supplier: { connect: { id: supplierId } }, createdBy }
    })
  }

  async findAll(page: number, limit: number) {
    const totalItems = await this.prismaService.client.products.count()
    const totalPages = Math.ceil(totalItems / limit)
    const products = await this.prismaService.client.products.findMany({
      skip: (page - 1) * limit,
      take: limit
    })
    return { products, totalItems, totalPages, currentPage: page, limit }
  }

  async findAllBySupplierId(supplierId: string, page: number, limit: number) {
    if (!(await this.suppliersService.findOneById(supplierId)))
      throw new NotFoundException(RESPONSE_MESSAGES.SUPPLIER_NOT_FOUND)
    const totalItems = await this.prismaService.client.products.count({ where: { supplierId } })
    const totalPages = Math.ceil(totalItems / limit)
    const products = []
    const procs = await this.prismaService.client.products.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { supplierId }
    })

    for (const product of procs) {
      const images = await this.prismaService.client.images.findMany({ where: { productsId: product.id } })
      products.push({ ...product, images })
    }

    return { products, totalItems, totalPages, currentPage: page, limit }
  }

  async findOneById(id: string) {
    const product: any = await this.prismaService.client.products.findUnique({ where: { id } })
    product.images = await this.prismaService.client.images.findMany({ where: { productsId: product.id } })
    return product
  }

  async findOne(id: string) {
    return await this.prismaService.client.products.findUnique({ where: { id } })
  }

  async update(updateProductDto: UpdateProductDto, user: IUser) {
    if (!(await this.findOne(updateProductDto.id)))
      throw new NotFoundException({ message: RESPONSE_MESSAGES.PRODUCT_NOT_FOUND })
    const { id, images, supplierId } = updateProductDto
    const updatedBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const updateData: any = { ...updateProductDto, updatedBy }
    if (images) console.log('Update images')
    if (supplierId) {
      if (!(await this.suppliersService.findOneById(supplierId)))
        throw new NotFoundException(RESPONSE_MESSAGES.SUPPLIER_NOT_FOUND)
      else updateData.Supplier = { connect: { id: supplierId } }
    }

    return await this.prismaService.client.products.update({ where: { id }, data: updateData })
  }

  async remove(id: string, user: IUser) {
    const deletedBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    await Promise.all([
      this.prismaService.client.products.update({ where: { id }, data: { deletedBy } }),
      this.prismaService.client.products.delete({ where: { id } })
    ])
    return { message: RESPONSE_MESSAGES.PRODUCT_REMOVED }
  }

  async removeAllBySupplierId(idSupplier: string, user: IUser) {
    const deletedBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    await Promise.all([
      this.prismaService.client.products.updateMany({ where: { supplierId: idSupplier }, data: { deletedBy } }),
      this.prismaService.client.products.deleteMany({ where: { supplierId: idSupplier } })
    ])
    return { message: RESPONSE_MESSAGES.PRODUCTS_REMOVED }
  }
}
