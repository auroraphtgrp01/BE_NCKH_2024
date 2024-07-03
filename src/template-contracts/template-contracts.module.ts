import { Module, forwardRef } from '@nestjs/common'
import { TemplateContractsService } from './template-contracts.service'
import { TemplateContractsController } from './template-contracts.controller'
import { CommonModule } from 'src/commons/common.module'
import { ContractAttributesModule } from 'src/contract-attributes/contract-attributes.module'
import { ContractAttributeValuesModule } from 'src/contract-attribute-values/contract-attribute-values.module'

@Module({
  imports: [forwardRef(() => CommonModule), forwardRef(() => ContractAttributesModule), ContractAttributeValuesModule],
  controllers: [TemplateContractsController],
  providers: [TemplateContractsService],
  exports: [TemplateContractsService]
})
export class TemplateContractsModule {}
