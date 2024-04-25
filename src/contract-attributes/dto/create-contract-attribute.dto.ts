import { Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator'
import { TypeContractAttributeValue } from 'src/constants/enum.constant'

export class CreateContractAttributeDto {
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

  @ValidateIf(
    (object) =>
      object.type === TypeContractAttributeValue.CONTRACT_ATTRIBUTE &&
      (!object.isContractEmpty || object.isContractEmpty !== true)
  )
  @IsString()
  @IsNotEmpty()
  readonly valueAttribute?: string

  @ValidateIf((object) => object.templateContractId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly contractId?: string

  @ValidateIf((object) => object.contractId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly templateContractId?: string

  @IsOptional()
  @IsBoolean()
  readonly isContractEmpty?: boolean
}
