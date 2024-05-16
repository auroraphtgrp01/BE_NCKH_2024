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

export class CreateContractAttributeDto {
  @IsString()
  @IsNotEmpty()
  type: string

  @IsString()
  @IsNotEmpty()
  value: string

  @ValidateIf((object) => object.templateContractId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  contractId?: string

  @IsOptional()
  index?: number
}

export class ContractAttributesDto {
  @IsString()
  @IsNotEmpty()
  type: string

  @IsString()
  @IsNotEmpty()
  value: string

  @ValidateIf(
    (object) =>
      object.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
      object.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
      object.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
      object.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
      object.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
      object.type === ETypeContractAttribute.TOTAL_AMOUNT
  )
  @IsString()
  @IsNotEmpty()
  property?: string
}

export class CreateContractAttributesDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  contractId?: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ContractAttributesDto)
  contractAttributes: ContractAttributesDto[]
}
