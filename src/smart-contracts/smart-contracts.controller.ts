import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { SmartContractsService } from './smart-contracts.service'
import { CreateSmartContractDto } from './dto/create-smart-contract.dto'
import { UpdateSmartContractDto } from './dto/update-smart-contract.dto'
import { IKeyValue, IStage } from 'src/interfaces/smart-contract.interface'

@Controller('smart-contracts')
export class SmartContractsController {
  constructor(private readonly smartContractsService: SmartContractsService) {}

  @Post()
  create(@Body() createSmartContractDto: CreateSmartContractDto) {
    return this.smartContractsService.create(createSmartContractDto)
  }

  @Post('/deploy-contract')
  async deployContract(
    @Body('contractId') contractId: string,
    @Body('supplier') supplier: string,
    @Body('users') user: string[],
    @Body('total') total?: number,
    @Body('orderId') orderId?: string
  ) {
    // return this.smartContractsService.deployContract(payload, contractId, supplier, users, total)
    return this.smartContractsService.deployContract(contractId, supplier, user, total, orderId)
  }

  @Get('/abi')
  getABI(@Query() contractName: object) {
    return this.smartContractsService.getABI(contractName)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smartContractsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmartContractDto: UpdateSmartContractDto) {
    return this.smartContractsService.update(+id, updateSmartContractDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smartContractsService.remove(+id)
  }
}
