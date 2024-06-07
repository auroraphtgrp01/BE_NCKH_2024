import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { EOrderStatus, ERoles } from 'src/constants/enum.constant'
import { ProductsService } from 'src/products/products.service'
import { CommonService } from 'src/commons/common.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { IExecutor } from 'src/interfaces/executor.interface'
import { SuppliersService } from 'src/suppliers/suppliers.service'
import { UsersService } from 'src/users/users.service'
import { IQueuePayloadSendRequestSurvey, QueueRedisService } from 'src/queues/queue-redis.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class OrdersService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly productsService: ProductsService,
    private readonly commonService: CommonService,
    private readonly suppliersService: SuppliersService,
    private readonly usersService: UsersService,
    private readonly queueRedisService: QueueRedisService,
    private readonly configService: ConfigService
  ) {}
  async create(createOrderDto: CreateOrderDto, user: IUser) {
    const productInfo = await this.productsService.findOneById(createOrderDto.productId)
    if (!productInfo) throw new NotFoundException(RESPONSE_MESSAGES.PRODUCT_NOT_FOUND)
    if (!(await this.suppliersService.findOneById(createOrderDto.supplierId)))
      throw new NotFoundException(RESPONSE_MESSAGES.SUPPLIER_NOT_FOUND)
    const hasOrder = await this.findOneStatusPendingBySupplierIdAndUserId(createOrderDto.supplierId, user.id)
    const executor: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    if (hasOrder) {
      if (!hasOrder.products.some((product: any) => product.id === createOrderDto.productId))
        await this.prismaService.client.orders.update({
          where: { id: hasOrder.id },
          data: {
            products: [
              ...hasOrder.products,
              {
                id: productInfo.id,
                name: productInfo.name,
                image:
                  productInfo.images.length > 0
                    ? productInfo.images[0].path
                    : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
                quantity: 0,
                price: productInfo.price,
                description: productInfo.description,
                discount: 0,
                taxPrice: productInfo.taxPrice,
                unit: productInfo.unit
              }
            ],
            updatedBy: executor
          }
        })
    } else
      await this.prismaService.client.orders.create({
        data: {
          orderCode: this.commonService.createRandomString(10),
          Suppliers: { connect: { id: createOrderDto.supplierId } },
          User: { connect: { id: user.id } },
          products: [
            {
              id: productInfo.id,
              name: productInfo.name,
              image:
                productInfo.images.length > 0
                  ? productInfo.images[0].path
                  : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
              quantity: 0,
              price: productInfo.price,
              description: productInfo.description,
              discount: 0,
              taxPrice: productInfo.taxPrice,
              unit: productInfo.unit
            }
          ],
          status: EOrderStatus.PENDING,
          createdBy: executor,
          updatedAt: null
        }
      })
    return { message: 'Add product successfully' }
  }

  async sendRequestSurvey(surveyId: string, user: IUser) {
    const updatedBy: IExecutor = { ...user }
    await this.prismaService.client.orders.update({
      where: { id: surveyId },
      data: { status: EOrderStatus.IN_PROGRESS, updatedBy: updatedBy }
    })
    try {
      const survey = await this.findOneById(surveyId)
      if (!survey) throw new NotFoundException({ message: RESPONSE_MESSAGES.ORDER_IS_NOT_FOUND })
      const payload: IQueuePayloadSendRequestSurvey = {
        to: survey.supplier.User.email,
        from: user.email,
        receiver: user.name,
        surveyCode: survey.order.orderCode,
        addressWalletSender: user.addressWallet,
        messages: 'Look forward to working with you',
        link: `${this.configService.get<string>('FRONTEND_HOST')}/order/${survey.order.id}`
      }
      this.queueRedisService.enqueueSendRequestSurvey(payload)
      return { message: 'Send request survey to supplier successfully' }
    } catch (error) {
      return { message: 'Error' }
    }
  }

  async resendRequestSurvey(surveyId: string, user: IUser) {
    const updatedBy: IExecutor = { ...user }
    await this.prismaService.client.orders.update({
      where: { id: surveyId },
      data: { status: EOrderStatus.COMPLETED, updatedBy: updatedBy }
    })
    try {
      const survey = await this.findOneById(surveyId)
      if (!survey) throw new NotFoundException({ message: RESPONSE_MESSAGES.ORDER_IS_NOT_FOUND })
      const payload: IQueuePayloadSendRequestSurvey = {
        to: survey.order.User.email,
        from: user.email,
        receiver: user.name,
        surveyCode: survey.order.orderCode,
        addressWalletSender: user.addressWallet,
        messages: 'Look forward to working with you',
        link: `${this.configService.get<string>('FRONTEND_HOST')}/order/${survey.order.id}`
      }
      this.queueRedisService.enqueueSendRequestSurvey(payload)
      return { message: 'Resend request survey to supplier successfully' }
    } catch (error) {
      return { message: 'Error' }
    }
  }

  async addProductToOrder(orderId: string, productId: string, user: IUser) {
    const product = await this.productsService.findOneById(productId)
    const { order } = await this.findOneById(orderId)
    const newOrder = await this.prismaService.client.orders.update({
      where: { id: orderId },
      data: {
        products: [
          ...order.products,
          {
            id: product.id,
            name: product.name,
            image:
              product.images.length > 0
                ? product.images[0].path
                : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
            quantity: 0,
            price: product.price,
            description: product.description,
            discount: 0,
            taxPrice: 0,
            unit: product.unit
          }
        ],
        updatedBy: { id: user.id, name: user.name, email: user.email, role: user.role }
      }
    })
    return { products: newOrder.products }
  }

  async findAllByUserId(user: IUser) {
    if (user.role === ERoles.CUSTOMER) {
      const orders = []
      const qOrders = await this.prismaService.client.orders.findMany({ where: { userId: user.id } })
      for (const order of qOrders) {
        const supplier = await this.suppliersService.findOneById(order.suppliersId)
        const customer = await this.usersService.findOneById(order.userId)
        const total = order.products.reduce(
          (sum: number, product: any) => sum + (product.price + product.taxPrice - product.discount) * product.quantity,
          0
        )
        orders.push({ ...order, supplier: supplier.name, customer: customer.name, total })
      }
      return { orders: [orders] }
    } else {
      const suppliers = await this.suppliersService.findAllByUserId(user.id)
      const orders = await Promise.all(
        suppliers.map(async (supplier) => {
          const orders = []
          const qOrders = await this.prismaService.client.orders.findMany({ where: { suppliersId: supplier.id } })
          for (const order of qOrders) {
            const customer = await this.usersService.findOneById(order.userId)
            const total = order.products.reduce(
              (sum: number, product: any) =>
                sum + (product.price + product.taxPrice - product.discount) * product.quantity,
              0
            )

            orders.push({ ...order, supplier: supplier.name, customer: customer.name, total })
          }

          return orders
        })
      )
      return { orders, suppliers }
    }
  }

  async checkOrderCode(orderCode: string, userId: string) {
    return await this.prismaService.client.orders.findFirst({ where: { orderCode, userId } })
  }

  async findOneById(id: string) {
    const order = await this.prismaService.client.orders.findUnique({
      where: { id },
      include: { Suppliers: true, User: true }
    })
    const supplier = await this.suppliersService.findOneById(order.suppliersId)
    return { order, supplier }
  }

  async findOneStatusPendingBySupplierIdAndUserId(suppliersId: string, userId: string) {
    const order = await this.prismaService.client.orders.findFirst({
      where: { status: EOrderStatus.PENDING, suppliersId, userId }
    })
    return order
  }

  findOne(id: number) {
    return `This action returns a #${id} order`
  }

  async update(updateOrderDto: UpdateOrderDto, user: IUser) {
    const currentOrder = await this.prismaService.client.orders.findUnique({ where: { id: updateOrderDto.id } })
    if (!currentOrder) throw new NotFoundException(RESPONSE_MESSAGES.ORDER_IS_NOT_FOUND)

    const { products, status, ...rest } = updateOrderDto
    if (products) {
      return await this.prismaService.client.orders.update({
        data: {
          ...rest,
          products: products as any,
          updatedBy: { id: user.id, name: user.name, email: user.email, role: user.role }
        },
        where: { id: updateOrderDto.id }
      })
    } else {
      return await this.prismaService.client.orders.update({
        data: {
          ...rest,
          status: status,
          updatedBy: { id: user.id, name: user.name, email: user.email, role: user.role }
        },
        where: { id: updateOrderDto.id }
      })
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`
  }
}
