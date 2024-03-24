import { Module } from '@nestjs/common';
import { ContractTypesService } from './contract_types.service';
import { ContractTypesController } from './contract_types.controller';

@Module({
  controllers: [ContractTypesController],
  providers: [ContractTypesService],
})
export class ContractTypesModule {}
