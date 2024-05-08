import { Module, forwardRef } from '@nestjs/common'
import { ContractAttributesService } from './contract-attributes.service'
import { ContractAttributesController } from './contract-attributes.controller'
import { CommonModule } from 'src/commons/common.module'
import { TemplateContractsModule } from 'src/template-contracts/template-contracts.module'
import { ContractAttributeValuesModule } from 'src/contract-attribute-values/contract-attribute-values.module'
@Module({
  imports: [
    forwardRef(() => CommonModule),
    forwardRef(() => TemplateContractsModule),
    forwardRef(() => ContractAttributeValuesModule)
  ],
  controllers: [ContractAttributesController],
  providers: [ContractAttributesService],
  exports: [ContractAttributesService]
})
export class ContractAttributesModule {}
