import { PartialType } from '@nestjs/mapped-types';
import { CreateContractAttributeValueDto } from './create-contract-attribute-value.dto';

export class UpdateContractAttributeValueDto extends PartialType(CreateContractAttributeValueDto) {}
