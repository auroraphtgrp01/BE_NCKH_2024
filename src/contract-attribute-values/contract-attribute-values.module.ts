import { Module, forwardRef } from '@nestjs/common'
import { ContractAttributeValuesService } from './contract-attribute-values.service'
import { ContractAttributeValuesController } from './contract-attribute-values.controller'
import { ContractAttributesModule } from 'src/contract-attributes/contract-attributes.module'

@Module({
  imports: [forwardRef(() => ContractAttributesModule)],
  controllers: [ContractAttributeValuesController],
  providers: [ContractAttributeValuesService],
  exports: [ContractAttributeValuesService]
})
export class ContractAttributeValuesModule {}
