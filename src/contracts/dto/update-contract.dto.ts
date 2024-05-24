import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
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
  readonly deliveryAt: string

  @IsNumber()
  readonly percent: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description?: string
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
  readonly id: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  readonly addressWallet?: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  readonly contractTitle?: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_LENGTH_MUST_BE_42_CHARACTERS })
  readonly contractAddress?: string

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GasPriceDto)
  readonly gasPrices?: GasPriceDto[]

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  @Type(() => Date)
  readonly startDate?: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @IsAfterDate('startDate')
  @IsBeforeDate('endDate')
  @Type(() => Date)
  readonly executeDate?: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @IsAfterDate('executeDate')
  @Type(() => Date)
  readonly endDate?: Date

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StageDto)
  readonly stages?: StageDto[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly agreements?: string[]

  @IsOptional()
  @IsNotEmpty()
  readonly status?: string

  @IsOptional()
  @IsObject()
  readonly votings?: object
}

export class UpdateContractAttributeDto {
  @IsString()
  id: string
  @IsArray()
  readonly updatedAttributes: any[]
  @IsOptional()
  @IsArray()
  readonly deleteArray: any[]
}
