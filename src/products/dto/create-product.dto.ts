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

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  supplierId: string
}
