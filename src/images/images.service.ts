import { Inject, Injectable } from '@nestjs/common'
import { CreateImageDto } from './dto/create-image.dto'
import { UpdateImageDto } from './dto/update-image.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Injectable()
export class ImagesService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async create(createImageDto: CreateImageDto, user: IUser) {
    const data: any = { path: createImageDto.path }
    const createdBy: any = { id: user.id, name: user.name, email: user.email, role: user.role }
    if (createImageDto.productId) data.Products = { connect: { id: createImageDto.productId } }
    else data.Suppliers = { connect: { id: createImageDto.supplierId } }
    const image = await this.prismaService.client.images.create({
      data: {
        ...data,
        createdBy,
        updatedAt: null
      }
    })
    return image
  }

  findAll() {
    return `This action returns all images`
  }

  findOne(id: number) {
    return `This action returns a #${id} image`
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`
  }

  remove(id: number) {
    return `This action removes a #${id} image`
  }
}
