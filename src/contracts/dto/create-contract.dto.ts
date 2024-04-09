import { Transform, Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinDate,
  MinLength,
  ValidateNested
} from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class GasPriceDto {
  @IsNumberString()
  price: string

  @IsString()
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  addressWallet: string

  @IsString()
  reason: string
}

export class PartyDto {
  @IsString()
  partyName: string

  @IsString()
  @MinLength(2, { message: RESPONSE_MESSAGES.REPRESENTATIVE_NAME_LENGTH })
  representativeName: string

  @IsString()
  userId: string

  @IsNumberString()
  @Length(10, 10, { message: RESPONSE_MESSAGES.TAX_CODE_LENGTH })
  taxCode: string

  @IsString()
  position: string

  @IsString()
  @IsEmail({}, { message: RESPONSE_MESSAGES.EMAIL_IS_INVALID })
  email: string

  @IsNumberString()
  @Length(12, 12, { message: RESPONSE_MESSAGES.INDENTIFY_NUMBER_LENGTH })
  indentifyNumber: string

  @IsNumberString()
  @Length(10, 10, { message: RESPONSE_MESSAGES.PHONE_NUMBER_LENGTH })
  phoneNumber: string

  @IsString()
  @MinLength(10, { message: RESPONSE_MESSAGES.THE_ADDRESS_MUST_BE_PROVIDED_IN_FULL_AND_CLEARLY })
  address: string
}

export class CreateContractDto {
  @IsOptional()
  @IsString()
  id: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  addressWallet: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  contractTitle: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_LENGTH_MUST_BE_42_CHARACTERS })
  contractAddress: string

  @IsOptional()
  @Length(66, 66, { message: RESPONSE_MESSAGES.BLOCK_ADDRESS_LENGTH_MUST_BE_66_CHARACTERS })
  blockAddress: string

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GasPriceDto)
  gasPrices: GasPriceDto[]

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => PartyDto)
  parties: PartyDto[]

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  startDate: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  endDate: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  executeDate: Date

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  agreements: string[]
}
