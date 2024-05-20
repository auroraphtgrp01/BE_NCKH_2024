import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  supplierId: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string
}
