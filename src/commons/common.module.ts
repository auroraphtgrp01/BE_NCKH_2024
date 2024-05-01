import { Inject, Module, forwardRef } from '@nestjs/common'
import { CommonService } from './common.service'
import { ContractsModule } from 'src/contracts/contracts.module'
import { ContractAttributesModule } from 'src/contract-attributes/contract-attributes.module'
import { ContractAttributeValuesModule } from 'src/contract-attribute-values/contract-attribute-values.module'
import { TemplateContractsModule } from 'src/template-contracts/template-contracts.module'

@Module({
  imports: [
    forwardRef(() => ContractsModule),
    ContractAttributesModule,
    ContractAttributeValuesModule,
    forwardRef(() => TemplateContractsModule)
  ],
  providers: [CommonService],
  exports: [CommonService]
})
export class CommonModule {}
