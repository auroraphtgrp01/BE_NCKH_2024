import { PartialType } from '@nestjs/mapped-types'
import { CreateContractAttributeDto } from './create-contract-attribute.dto'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateContractAttributeDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string

  @IsOptional()
  readonly index: number

  @IsOptional()
  @IsString()
  readonly value?: string

  @IsOptional()
  @IsString()
  readonly type?: string
}
