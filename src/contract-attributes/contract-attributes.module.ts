import { Module, forwardRef } from '@nestjs/common'
import { ContractAttributesService } from './contract-attributes.service'
import { ContractAttributesController } from './contract-attributes.controller'
import { CommonModule } from 'src/commons/common.module'
@Module({
  imports: [forwardRef(() => CommonModule)],
  controllers: [ContractAttributesController],
  providers: [ContractAttributesService],
  exports: [ContractAttributesService]
})
export class ContractAttributesModule {}
