import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  MinLength
} from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'

export class UpdateUserDto {
  @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
  @IsString({ message: RESPONSE_MESSAGES.ID_MUST_BE_A_STRING })
  @Length(36, 36, { message: RESPONSE_MESSAGES.INVALID_ID })
  readonly id: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.NAME_MUST_BE_A_STRING })
  readonly name: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @MaxLength(42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  @MinLength(42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  readonly addressWallet: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.EMAIL_MUST_BE_A_STRING })
  @IsEmail({}, { message: RESPONSE_MESSAGES.EMAIL_IS_INVALID })
  readonly email: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly roleId: string

  @IsOptional()
  readonly gender: string

  @IsOptional()
  @IsDateString({}, { message: RESPONSE_MESSAGES.DATEOFBIRTH_MUST_BE_A_DATE })
  readonly dateOfBirth: string

  @IsOptional()
  readonly phoneNumber: string

  @IsOptional()
  @MaxLength(12)
  @MinLength(12)
  readonly indentifyNumber: string
}

export class UpdateUserPINDto {
  @MaxLength(6, { message: RESPONSE_MESSAGES.PIN_LENGTH_IS_6_DIGIT })
  @MinLength(6, { message: RESPONSE_MESSAGES.PIN_LENGTH_IS_6_DIGIT })
  @IsNumberString({}, { message: RESPONSE_MESSAGES.PIN_IS_NUMBER })
  PIN: string
}
