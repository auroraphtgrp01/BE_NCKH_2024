import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name?: string

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly price?: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description?: string

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly taxPrice?: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly unit?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly supplierId: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly images?: string[]
}
