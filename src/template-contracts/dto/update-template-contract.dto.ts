import { PartialType } from '@nestjs/swagger'
import { CreateTemplateContractDto } from './create-template-contract.dto'

export class UpdateTemplateContractDto extends PartialType(CreateTemplateContractDto) {}
