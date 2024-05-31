import { PartialType } from '@nestjs/swagger'
import { CreateOrderDto } from './create-order.dto'
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'

export class OrderProductDto {
  @IsOptional()
  @IsNumber()
  @Validate((object: any) => object.quantity >= 0)
  quantity?: number

  @IsOptional()
  @IsNumber()
  @Validate((object: any) => object.price >= 0)
  price?: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string

  @IsOptional()
  @IsNumber()
  @Validate((object: any) => object.discount >= 0)
  discount?: number

  @IsOptional()
  @IsNumber()
  @Validate((object: any) => object.taxPrice >= 0)
  taxPrice?: number
}

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Validate((object: any) => ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'].includes(object.status.toUpperCase()))
  status?: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products?: OrderProductDto[]

  @IsOptional()
  @IsDateString()
  executeDate?: string

  @IsOptional()
  @IsDateString()
  endDate?: string
}
