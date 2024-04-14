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
  MinLength,
  ValidateNested
} from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { CreatePartyInfoDto } from 'src/party-infos/dto/create-party-info.dto'

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
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  @Type(() => Date)
  startDate: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  @Type(() => Date)
  endDate: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  @Type(() => Date)
  executeDate: Date

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  agreements: string[]
}
