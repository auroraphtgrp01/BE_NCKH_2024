import { Module } from '@nestjs/common'
import { ContractAttributesService } from './contract-attributes.service'
import { ContractAttributesController } from './contract-attributes.controller'
@Module({
  controllers: [ContractAttributesController],
  providers: [ContractAttributesService],
  exports: [ContractAttributesService]
})
export class ContractAttributesModule {}
