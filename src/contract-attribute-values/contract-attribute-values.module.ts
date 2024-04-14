import { Module } from '@nestjs/common'
import { ContractAttributeValuesService } from './contract-attribute-values.service'
import { ContractAttributeValuesController } from './contract-attribute-values.controller'
import { ContractAttributesModule } from 'src/contract-attributes/contract-attributes.module'
import { CommonService } from 'src/common.service'

@Module({
  imports: [ContractAttributesModule],
  controllers: [ContractAttributeValuesController],
  providers: [ContractAttributeValuesService, CommonService],
  exports: [ContractAttributeValuesService, CommonService]
})
export class ContractAttributeValuesModule {}
