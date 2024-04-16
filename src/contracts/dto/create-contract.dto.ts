import { Transform, Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinDate,
  ValidateIf,
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

export class CreateContractDto {
  @IsOptional()
  @IsString()
  id: string

  @ValidateIf((object) => object.id !== undefined)
  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  addressWallet: string

  @ValidateIf((object) => object.id !== undefined)
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  contractTitle: string

  @ValidateIf((object) => object.id !== undefined)
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_LENGTH_MUST_BE_42_CHARACTERS })
  contractAddress: string

  @ValidateIf((object) => object.id !== undefined)
  @Length(66, 66, { message: RESPONSE_MESSAGES.BLOCK_ADDRESS_LENGTH_MUST_BE_66_CHARACTERS })
  blockAddress: string

  @ValidateIf((object) => object.id !== undefined)
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GasPriceDto)
  gasPrices: GasPriceDto[]

  @ValidateIf((object) => object.id !== undefined)
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  @Type(() => Date)
  startDate: Date

  @ValidateIf((object) => object.id !== undefined)
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  @Type(() => Date)
  endDate: Date

  @ValidateIf((object) => object.id !== undefined)
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  @Type(() => Date)
  executeDate: Date

  @ValidateIf((object) => object.id !== undefined)
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  agreements: string[]
}
