import { IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator'

export class CreateContractAttributeValueDto {
  @ValidateIf((object) => object.templateContractId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  contractId?: string

  @ValidateIf((object) => object.contractId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  templateContractId?: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  contractAttributeId: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  value: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string
}
