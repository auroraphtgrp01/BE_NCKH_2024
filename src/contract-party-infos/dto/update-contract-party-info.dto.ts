import { PartialType } from '@nestjs/mapped-types';
import { CreateContractPartyInfoDto } from './create-contract-party-info.dto';

export class UpdateContractPartyInfoDto extends PartialType(CreateContractPartyInfoDto) {}
