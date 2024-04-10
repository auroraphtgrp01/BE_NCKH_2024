import { PartialType } from '@nestjs/mapped-types';
import { CreatePartyInfoDto } from './create-party-info.dto';

export class UpdatePartyInfoDto extends PartialType(CreatePartyInfoDto) {}
