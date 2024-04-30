import { Module, forwardRef } from '@nestjs/common'
import { TemplateContractsService } from './template-contracts.service'
import { TemplateContractsController } from './template-contracts.controller'
import { CommonModule } from 'src/commons/common.module'

@Module({
  imports: [forwardRef(() => CommonModule)],
  controllers: [TemplateContractsController],
  providers: [TemplateContractsService],
  exports: [TemplateContractsService]
})
export class TemplateContractsModule {}
