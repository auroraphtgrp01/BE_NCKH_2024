import { Module } from '@nestjs/common'
import { TemplateContractsService } from './template-contracts.service'
import { TemplateContractsController } from './template-contracts.controller'
import { CommonService } from 'src/common.service'
import { ContractAttributeValuesModule } from 'src/contract-attribute-values/contract-attribute-values.module'
import { ContractAttributesModule } from 'src/contract-attributes/contract-attributes.module'

@Module({
  imports: [ContractAttributeValuesModule, ContractAttributesModule],
  controllers: [TemplateContractsController],
  providers: [TemplateContractsService, CommonService],
  exports: [TemplateContractsService, CommonService]
})
export class TemplateContractsModule {}
