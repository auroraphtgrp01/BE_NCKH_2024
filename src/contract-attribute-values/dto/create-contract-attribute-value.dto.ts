import { Type } from 'class-transformer'
import { IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator'
export class CreateContractAttributeValueDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  contractAttributeId: string

  @IsString()
  @IsNotEmpty()
  value: string

  @IsOptional()
  @IsString()
  descriptionOfStage?: string
}
