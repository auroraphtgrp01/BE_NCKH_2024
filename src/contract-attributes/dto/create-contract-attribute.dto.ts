import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateContractAttributeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  readonly contractId: string
}
