import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator'

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Tax code must be 10 characters long' })
  taxCode: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string
}
