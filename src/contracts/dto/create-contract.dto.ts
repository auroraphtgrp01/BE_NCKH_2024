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
  IsUUID,
  Length,
  MaxLength,
  MinDate,
  MinLength,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { IsAfterDate } from 'src/decorators/is-after-Date.decorator'
import { IsBeforeDate } from 'src/decorators/is-before-date.decorator'

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

  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  addressWallet: string

  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  contractTitle: string

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @MinDate(new Date(), { message: RESPONSE_MESSAGES.THE_DATE_IS_INVALID })
  @Type(() => Date)
  startDate: Date

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @IsAfterDate('startDate')
  @IsBeforeDate('endDate')
  @Type(() => Date)
  executeDate: Date

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: RESPONSE_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE })
  @IsAfterDate('executeDate')
  @Type(() => Date)
  endDate: Date

  @ValidateIf((object) => object.id !== undefined)
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  agreements: string[]
}

export class AnotherDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ContractAttributeValuesDto)
  contractAttributeValues?: ContractAttributeValuesDto[]

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => InvitationsDto)
  invitations: InvitationsDto[]
}

export class InvitationsDto {
  @IsString({ message: RESPONSE_MESSAGES.EMAIL_TO_MUST_BE_A_STRING })
  @IsNotEmpty()
  @IsEmail({}, { message: RESPONSE_MESSAGES.EMAIL_TO_IS_INVALID })
  to: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.MESSAGE_MUST_BE_A_STRING })
  @MinLength(10, { message: RESPONSE_MESSAGES.MESSAGE_TOO_SHORT })
  messages: string
}

export class ContractAttributeValuesDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string

  @IsString()
  @IsNotEmpty()
  value: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.DESCRIPTION_MUST_BE_A_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.DESCRIPTION_LENGTH })
  description: string
}
