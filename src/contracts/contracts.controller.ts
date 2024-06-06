import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Inject, forwardRef } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { CreateContractAttributesDto, CreateContractDto, CreateDisputeContractDto } from './dto/create-contract.dto'
import { UpdateContractAttributeDto, UpdateContractDto } from './dto/update-contract.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { User } from 'src/decorators/user.decorator'
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  async create(@Body() createContractDto: CreateContractDto, @User() user: IUser) {
    return await this.contractsService.create(createContractDto, user)
  }

  @Post('dispute-contract')
  async createDisputeContract(@Body() createDisputeContractDto: CreateDisputeContractDto, @User() user: IUser) {
    return await this.contractsService.createDisputeContract(createDisputeContractDto, user)
  }

  @Post('create-by-survey')
  async createContractBySurvey(@Body('surveyId') surveyId: string, @User() user: IUser) {
    return await this.contractsService.createContractBySurveyId(surveyId, user)
  }

  @Get('get-contract-details/:contractId')
  async getContractDetailsById(@Param('contractId') contractId: string, @User() user: IUser) {
    return await this.contractsService.getContractDetailsById(contractId, user)
  }

  @Get()
  findAll() {
    return this.contractsService.findAll()
  }

  @Get('get-all-contract-details')
  async getAllContractDetails(@User() user: IUser) {
    return await this.contractsService.getContractsByUserId(user)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOneById(id)
  }

  @Patch()
  update(@Body() updateContractDto: UpdateContractDto, @User() user: IUser) {
    return this.contractsService.update(updateContractDto, user)
  }

  @Patch('attribute')
  updateContractAttribute(@Body() updateContractAttributeDto: UpdateContractAttributeDto, @User() user: IUser) {
    return this.contractsService.updateContractAttribute(updateContractAttributeDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id)
  }

  @Post('/handle-deploy')
  async handleDeploy(@Body('contractId') contractId: string) {
    return await this.contractsService.handleDeployContract(contractId)
  }

  // @Get('/compare-attribute')
  // async compareAttribute(contractId: string) {
  //   return await this.contractsService.compareAttribute(contractId)
  // }
}
