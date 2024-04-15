import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateContractAttributeValueDto {
  @IsUUID()
  @IsNotEmpty()
  contractId: string

  @IsUUID()
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
