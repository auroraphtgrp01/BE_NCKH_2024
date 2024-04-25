import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Validate,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { TypeContractAttributeValue } from 'src/constants/enum.constant'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class DataCreateContractAttributeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly idArea: string

  @IsString()
  @IsNotEmpty()
  readonly type: string

  @ValidateIf((object) => object.type === TypeContractAttributeValue.CONTRACT_ATTRIBUTE)
  @IsString()
  @IsNotEmpty()
  readonly valueAttribute?: string
}

export class CreateTemplateContractDto {
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_TITLE_MUST_BE_STRING })
  @IsNotEmpty()
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  contractTitle: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DataCreateContractAttributeDto)
  contractAttributes: DataCreateContractAttributeDto[]
}
