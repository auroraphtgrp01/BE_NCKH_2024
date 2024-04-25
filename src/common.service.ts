import { Inject, Injectable } from '@nestjs/common'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from './utils/prisma.extensions'

@Injectable()
export class CommonService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async findOneContractById(id: string) {
    const contract = await this.prismaService.client.contract.findUnique({ where: { id } })
    return contract
  }

  async findOneTemplateContractById(id: string) {
    return await this.prismaService.client.templateContract.findUnique({
      where: { id }
    })
  }

  async findOneContractAttributeById(id: string) {
    return await this.prismaService.client.contractAttribute.findUnique({ where: { id } })
  }
}
