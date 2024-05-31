import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNumber()
  @IsNotEmpty()
  taxPrice: number

  @IsString()
  @IsNotEmpty()
  unit: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  supplierId: string
}
