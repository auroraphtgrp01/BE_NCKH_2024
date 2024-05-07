import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

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
  address: string
  userId: string
}
