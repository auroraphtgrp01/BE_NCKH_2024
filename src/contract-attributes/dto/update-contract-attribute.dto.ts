import { PartialType } from '@nestjs/mapped-types';
import { CreateContractAttributeDto } from './create-contract-attribute.dto';

export class UpdateContractAttributeDto extends PartialType(CreateContractAttributeDto) {}
