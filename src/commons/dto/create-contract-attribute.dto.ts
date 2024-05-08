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

export class ContractAttributesDto {
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

export class CreateContractAttributeContractCommonDto {
  @ValidateIf((object) => object.templateContractId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly contractId: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => String)
  contractAttributes: CreateContractAttributesDto[]
}

export class CreateContractAttributesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => String)
  contractAttributes: ContractAttributesDto[]
}
