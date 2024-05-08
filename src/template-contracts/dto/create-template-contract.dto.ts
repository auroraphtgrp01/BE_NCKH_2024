import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'

export class CreateContractAttributeDto {
  @IsOptional()
  @IsString()
  readonly property: string

  @IsString()
  @IsNotEmpty()
  readonly value: string

  @IsString()
  @IsNotEmpty()
  readonly type: string
}

export class CreateTemplateContractDto {
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_TITLE_MUST_BE_STRING })
  @IsNotEmpty()
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  name: string

  @IsString()
  @IsNotEmpty()
  path: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => String)
  contractAttributes: string[]
}
