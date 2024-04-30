import { PartialType } from '@nestjs/mapped-types'
import { CreateContractAttributeValueDto } from './create-contract-attribute-value.dto'
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class UpdateContractAttributeValueDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  value: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.DESCRIPTION_MUST_BE_A_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.DESCRIPTION_LENGTH })
  description: string
}
