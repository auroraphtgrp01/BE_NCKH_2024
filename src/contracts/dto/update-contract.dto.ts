import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  MinDate,
  ValidateNested
} from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { GasPriceDto } from './create-contract.dto'
import { IsAfterDate } from 'src/decorators/is-after-Date.decorator'
import { IsBeforeDate } from 'src/decorators/is-before-date.decorator'
import { contractStatus } from '@prisma/client'

export class StageDto {
  @IsDateString()
  @IsNotEmpty()
  deliveryAt: string

  @IsNumber()
  percent: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string
}

export class CreateContractAttributeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string

  @IsOptional()
  @IsString()
  readonly property: string

  @IsString()
  @IsNotEmpty()
  readonly value: string

  @IsString()
  @IsNotEmpty()
  readonly type: string
}

export class UpdateContractDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  addressWallet?: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  contractTitle?: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_LENGTH_MUST_BE_42_CHARACTERS })
  contractAddress?: string

  @IsOptional()
  @Length(66, 66, { message: RESPONSE_MESSAGES.BLOCK_ADDRESS_LENGTH_MUST_BE_66_CHARACTERS })
  blockAddress?: string

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GasPriceDto)
  gasPrices?: GasPriceDto[]

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  @Type(() => Date)
  startDate?: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @IsAfterDate('startDate')
  @IsBeforeDate('endDate')
  @Type(() => Date)
  executeDate?: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @IsAfterDate('executeDate')
  @Type(() => Date)
  endDate?: Date

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StageDto)
  stages?: StageDto[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  agreements?: string[]

  @IsOptional()
  @IsNotEmpty()
  status: string
}

export class UpdateContractAttributeDto {
  @IsString()
  id: string
  @IsArray()
  updatedAttributes: any[]
  @IsOptional()
  @IsArray()
  deleteArray: any[]
}
