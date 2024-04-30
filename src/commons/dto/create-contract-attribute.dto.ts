import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { ETypeContractAttribute } from 'src/constants/enum.constant'

export class CreateContractAttributesDto {
  @IsString()
  @IsNotEmpty()
  readonly type: string

  @IsString()
  @IsNotEmpty()
  readonly value: string

  @ValidateIf(
    (object) =>
      object.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
      object.type === ETypeContractAttribute.CONTRACT_SIGNATURE
  )
  @IsString()
  @IsNotEmpty()
  readonly property?: string
}

export class CreateContractAttributeCommonDto {
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

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateContractAttributesDto)
  contractAttributes: CreateContractAttributesDto[]
}
