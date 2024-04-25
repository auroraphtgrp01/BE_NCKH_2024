import { Module } from '@nestjs/common'
import { ContractAttributesService } from './contract-attributes.service'
import { ContractAttributesController } from './contract-attributes.controller'
import { CommonService } from 'src/common.service'
import { ContractAttributeValuesModule } from 'src/contract-attribute-values/contract-attribute-values.module'
@Module({
  imports: [ContractAttributeValuesModule],
  controllers: [ContractAttributesController],
  providers: [ContractAttributesService, CommonService],
  exports: [ContractAttributesService, CommonService]
})
export class ContractAttributesModule {}
