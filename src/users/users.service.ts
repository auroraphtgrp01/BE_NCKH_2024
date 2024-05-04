import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CustomPrismaService } from 'nestjs-prisma'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { readContract } from 'src/utils/readContract.utils'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto, UpdateUserPINDto } from './dto/update-user.dto'
import { hashPassword } from 'src/utils/hashPassword'
import { IExecutor } from 'src/interfaces/executor.interface'
import { IUser } from './interfaces/IUser.interface'
import { Exact } from '@prisma/client/runtime/library'
import { Gender } from '@prisma/client'
import { isNumeric } from 'src/decorators/is-nummeric.decorator'
import { ERoles } from 'src/constants/enum.constant'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class UsersService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async create(createUserDto: CreateUserDto, user?: IUser) {
    if (Object.values(ERoles).some((role) => role === createUserDto.role) == false)
      throw new NotFoundException(RESPONSE_MESSAGES.ROLE_IS_INVALID)
    const isUserExist = await this.prismaService.client.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { addressWallet: createUserDto.addressWallet },
          { indentifyNumber: createUserDto.indentifyNumber }
        ]
      }
    })
    if (isUserExist) {
      throw new NotFoundException(RESPONSE_MESSAGES.USER_IS_EXIST)
    }

    let createdBy: IExecutor = null

    if (user) {
      createdBy = { id: user.id, name: user.name, email: user.email, role: user.role }
      if (!createUserDto.PIN) throw new UnauthorizedException({ message: RESPONSE_MESSAGES.PIN_IS_REQUIRED })
      if (createUserDto.PIN.length !== 6) throw new UnauthorizedException(RESPONSE_MESSAGES.PIN_LENGTH_IS_6_DIGIT)
      if (!isNumeric(createUserDto.PIN)) throw new UnauthorizedException(RESPONSE_MESSAGES.PIN_MUST_BE_A_NUMBER)
    }
    return await this.prismaService.client.user.create({
      data: {
        ...createUserDto,
        gender: createUserDto.gender as Exact<Gender, Gender>,
        PIN: createUserDto.PIN ? await hashPassword(createUserDto.PIN) : null,
        updatedAt: null,
        createdBy
      }
    })
  }

  async updatePIN(updateUserPINDto: UpdateUserPINDto, id: string) {
    const hashPIN = await hashPassword(updateUserPINDto.PIN)
    return await this.prismaService.client.user.update({
      where: {
        id
      },
      data: {
        PIN: hashPIN
      }
    })
  }

  async findAll(page: number, limit: number, order: 'asc' | 'desc') {
    const totalItems = await this.prismaService.client.user.count()
    const totalPages = Math.ceil(totalItems / limit)
    const users = await this.prismaService.client.user.findMany({
      skip: (page - 1) * limit,
      take: limit * 1,
      orderBy: {
        id: order
      }
    })
    return {
      users,
      totalItems,
      totalPages,
      currentPage: page,
      limit
    }
  }

  async findOneById(id: string) {
    const user = await this.prismaService.client.user.findUnique({ where: { id } })
    return user
  }

  async findOne(payload: string) {
    const user = await await this.prismaService.client.user.findFirst({
      where: {
        OR: [{ email: payload }, { addressWallet: payload }, { indentifyNumber: payload }]
      }
    })
    return user
  }

  async findOneByAddressWallet(addressWallet: string) {
    const user = await this.prismaService.client.user.findUnique({ where: { addressWallet } })
    return user
  }

  async update(updateUserDto: UpdateUserDto, _user: IUser) {
    const updatedBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email, role: _user.role }
    const user = await this.prismaService.client.user.update({
      where: { id: updateUserDto.id },
      data: {
        ...updateUserDto,
        gender: updateUserDto.gender as Exact<Gender, Gender>,
        updatedBy
      }
    })
    return user
  }

  async remove(id: string, _user: IUser) {
    const deletedBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email, role: _user.role }
    await this.prismaService.client.user.update({ where: { id }, data: { deletedBy } })
    const user = await this.prismaService.client.user.delete({ where: { id } })
    return user
  }

  getABI() {
    const filePath = 'artifacts/contracts/ContractA.sol/ContractA.json'
    return readContract(filePath).abi
  }

  async deployContract(): Promise<any> {
    const _users = ['0x2B4eD1802A104C3984189327243f075AE6553fFc', '0x26f974dF11e949FCecEba0d2d5549C9B8320dc13']
    const _keys = ['contract', 'contractAttributes']
    const _values = [
      '0x7b22636f6e747261637473223a7b226964223a2265613961643637312d376234322d346432632d393562352d373530343765326162656435222c22636f6e74726163745469746c65223a224d6f692054616f204e756d6265722054776f222c226164647265737357616c6c6574223a22307832366639373464463131653934394643656345626130643264353534394339423833323064633330222c22636f6e747261637441646472657373223a6e756c6c2c22626c6f636b41646472657373223a6e756c6c2c22676173507269636573223a5b5d2c22737461727444617465223a6e756c6c2c22656e6444617465223a6e756c6c2c226578656375746544617465223a6e756c6c2c2261677265656d656e7473223a5b5d2c22737461747573223a2250454e44494e47222c22637265617465644174223a22323032342d30352d30335430323a35383a30382e3637335a222c22757064617465644174223a6e756c6c2c22637265617465644279223a7b226964223a2233393364393132362d346533312d343630312d623133382d336538316132663330376434222c226e616d65223a224b68616e68205472616e222c22726f6c65223a2255736572222c22656d61696c223a226475796b68616e687472616e313730313130313240676d61696c2e636f6d227d2c22757064617465644279223a6e756c6c2c2264656c657465644174223a6e756c6c2c2264656c657465644279223a6e756c6c7d7d',
      '0x5b7b226964223a2265393535353035382d656533612d346564352d626130652d313633636165303731316238222c2276616c7565223a224361632062656e207468616d20676961222c2274797065223a22436f6e74726163742048656164696e672031222c22637265617465644279223a7b226964223a2233393364393132362d346533312d343630312d623133382d336538316132663330376434222c226e616d65223a224b68616e68205472616e222c22656d61696c223a226475796b68616e687472616e313730313130313240676d61696c2e636f6d222c22726f6c65223a2255736572227d7d2c7b226964223a2236653933373463312d393237652d346262662d393035342d613661313839306531363563222c2276616c7565223a2242656e206e68616e222c2274797065223a22436f6e74726163742048656164696e672032222c22637265617465644279223a7b226964223a2233393364393132362d346533312d343630312d623133382d336538316132663330376434222c226e616d65223a224b68616e68205472616e222c22656d61696c223a226475796b68616e687472616e313730313130313240676d61696c2e636f6d222c22726f6c65223a2255736572227d7d2c7b226964223a2231623033346537312d656530312d346334662d623736352d376563326666646661323136222c2270726f7065727479223a224f6e672044756e67222c2276616c7565223a22222c2274797065223a22436f6e747261637420417474726962757465222c22637265617465644279223a7b226964223a2233393364393132362d346533312d343630312d623133382d336538316132663330376434222c226e616d65223a224b68616e68205472616e222c22656d61696c223a226475796b68616e687472616e313730313130313240676d61696c2e636f6d222c22726f6c65223a2255736572227d7d2c7b226964223a2262316162323834622d643530312d343936352d623331622d316564356464366464376337222c2276616c7565223a2242656e2063756e6720636170222c2274797065223a22436f6e74726163742048656164696e672032222c22637265617465644279223a7b226964223a2233393364393132362d346533312d343630312d623133382d336538316132663330376434222c226e616d65223a224b68616e68205472616e222c22656d61696c223a226475796b68616e687472616e313730313130313240676d61696c2e636f6d222c22726f6c65223a2255736572227d7d2c7b226964223a2265373932383461652d306465632d343830652d623935612d323563633230333463393036222c2270726f7065727479223a2242612054616d222c2276616c7565223a22222c2274797065223a22436f6e747261637420417474726962757465222c22637265617465644279223a7b226964223a2233393364393132362d346533312d343630312d623133382d336538316132663330376434222c226e616d65223a224b68616e68205472616e222c22656d61696c223a226475796b68616e687472616e313730313130313240676d61696c2e636f6d222c22726f6c65223a2255736572227d7d5d'
    ]
    const ignition = `import {buildModule} from "@nomicfoundation/hardhat-ignition/modules";
      const SupplyChain = buildModule("SupplyChain", (m) => {
      const _user = m.getParameter("_user", ${JSON.stringify(_users)});
      const _supplier = m.getParameter("_supplier", ${JSON.stringify('0x69eD52e5C637a9393E0a0F575d5c8F5aeDa045Ea')});
      const _keys = m.getParameter("_keys", ${JSON.stringify(_keys)});
      const _values = m.getParameter("_values", ${JSON.stringify(_values)});
      const _total = m.getParameter("_total", ${JSON.stringify('5000000000000000000')});
      const contract = m.contract("SupplyChain", [_user, _supplier, _keys, _values, _total]);
  return {
      contract
  }})
  export default SupplyChain`

    const ignitionPath = path.join(process.cwd(), '/ignition/modules', 'SupplyChain.ignition.ts')
    fs.writeFileSync(ignitionPath, ignition)
  }
}
