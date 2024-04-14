import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateContractAttributeValueDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  contractId: string

  @IsUUID()
  @IsString()
  @IsNotEmpty()
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
