import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { User } from 'src/decorators/user.decorator'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @User() user: IUser) {
    return await this.ordersService.create(createOrderDto, user)
  }

  @Post('/add-product')
  async addProduct(@Body('orderId') orderId: string, @Body('productId') productId: string, @User() user: IUser) {
    return await this.ordersService.addProductToOrder(orderId, productId, user)
  }

  @Get('find-all-by-user-id')
  async findAllByUserId(@User() user: IUser) {
    return this.ordersService.findAllByUserId(user)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOneById(id)
  }

  @Patch()
  async update(@Body() updateOrderDto: UpdateOrderDto, @User() user: IUser) {
    return await this.ordersService.update(updateOrderDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id)
  }
}
