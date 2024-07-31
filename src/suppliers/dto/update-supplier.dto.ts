import { PartialType } from '@nestjs/swagger'
import { CreateSupplierDto } from './create-supplier.dto'
import { IsArray, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID, Length } from 'class-validator'

export class UpdateSupplierDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly userId?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Tax code must be 10 characters long' })
  readonly taxCode?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email?: string

  @IsOptional()
  @IsNumberString()
  @IsNotEmpty()
  readonly phoneNumber?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly address?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly images?: string[]
}
