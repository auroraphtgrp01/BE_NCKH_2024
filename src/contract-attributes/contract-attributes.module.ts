import { Module, forwardRef } from '@nestjs/common'
import { ContractAttributesService } from './contract-attributes.service'
import { ContractAttributesController } from './contract-attributes.controller'
import { CommonModule } from 'src/commons/common.module'
import { TemplateContractsModule } from 'src/template-contracts/template-contracts.module'
@Module({
  imports: [forwardRef(() => CommonModule), forwardRef(() => TemplateContractsModule)],
  controllers: [ContractAttributesController],
  providers: [ContractAttributesService],
  exports: [ContractAttributesService]
})
export class ContractAttributesModule {}
