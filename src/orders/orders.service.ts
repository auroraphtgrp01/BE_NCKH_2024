import { Inject, Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'

@Injectable()
export class OrdersService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order'
  }

  findAll() {
    return `This action returns all orders`
  }

  async findOneById(id: string) {
    const order = await this.prismaService.client.orders.findUnique({ where: { id } })
    return order
  }

  findOne(id: number) {
    return `This action returns a #${id} order`
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`
  }

  remove(id: number) {
    return `This action removes a #${id} order`
  }
}
