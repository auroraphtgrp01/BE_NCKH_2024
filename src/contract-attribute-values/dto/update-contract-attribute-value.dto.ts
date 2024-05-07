import { PartialType } from '@nestjs/mapped-types'
import { CreateContractAttributeValueDto } from './create-contract-attribute-value.dto'
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, ValidateIf } from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'

export class UpdateContractAttributeValueDto {
  @ValidateIf((object) => object.contractAttributeId !== undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly id?: string

  @ValidateIf((object) => object.id !== undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly contractAttributeId?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly value: string
}
