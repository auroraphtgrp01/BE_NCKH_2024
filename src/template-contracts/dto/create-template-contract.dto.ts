import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested
} from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class ContractAttributeValuesDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  value: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  contractAttributeId: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.DESCRIPTION_MUST_BE_A_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.DESCRIPTION_LENGTH })
  description: string
}

export class CreateTemplateContractDto {
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_TITLE_MUST_BE_STRING })
  @IsNotEmpty()
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  contractTitle: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ContractAttributeValuesDto)
  contractAttributeValues: ContractAttributeValuesDto[]
}
