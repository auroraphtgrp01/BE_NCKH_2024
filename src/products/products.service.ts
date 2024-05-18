import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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
    private readonly suppliersService: SuppliersService
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

  findAll() {
    return `This action returns all products`
  }

  async findAllBySupplierId(supplierId: string) {
    if (!(await this.suppliersService.findOneById(supplierId)))
      throw new NotFoundException(RESPONSE_MESSAGES.SUPPLIER_NOT_FOUND)

    const products = await this.prismaService.client.products.findMany({
      where: { supplierId }
    })
    return products
  }

  async findOneById(id: string) {
    const product = await this.prismaService.client.products.findUnique({ where: { id } })
    const image = await this.prismaService.client.images.findMany({ where: { productsId: id } })
    return { product, image }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
