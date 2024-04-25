import { Module } from '@nestjs/common'
import { ContractAttributeValuesService } from './contract-attribute-values.service'
import { ContractAttributeValuesController } from './contract-attribute-values.controller'
import { CommonService } from 'src/common.service'

@Module({
  controllers: [ContractAttributeValuesController],
  providers: [ContractAttributeValuesService, CommonService],
  exports: [ContractAttributeValuesService, CommonService]
})
export class ContractAttributeValuesModule {}
