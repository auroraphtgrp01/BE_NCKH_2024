import { Module, forwardRef } from '@nestjs/common'
import { ContractAttributesService } from './contract-attributes.service'
import { ContractAttributesController } from './contract-attributes.controller'
import { CommonService } from 'src/common.service'
@Module({
  controllers: [ContractAttributesController],
  providers: [ContractAttributesService, CommonService],
  exports: [ContractAttributesService, CommonService]
})
export class ContractAttributesModule {}
