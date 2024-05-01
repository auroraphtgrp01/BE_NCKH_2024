import { Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator'
import { ETypeContractAttribute } from 'src/constants/enum.constant'

export class CreateContractAttributeDto {
  @IsString()
  @IsNotEmpty()
  readonly type: string

  @IsString()
  @IsNotEmpty()
  readonly value: string

  @ValidateIf((object) => object.templateContractId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly contractId?: string

  @IsOptional()
  index?: number

  @ValidateIf((object) => object.contractId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly templateContractId?: string
}
