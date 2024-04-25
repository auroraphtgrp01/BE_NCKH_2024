import { Transform, Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
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
import { TypeContractAttributeValue } from 'src/constants/enum.constant'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { CreateContractAttributeDto } from 'src/contract-attributes/dto/create-contract-attribute.dto'
import { IsAfterDate } from 'src/decorators/is-after-Date.decorator'
import { IsBeforeDate } from 'src/decorators/is-before-date.decorator'
import { DataCreateContractAttributeDto } from 'src/template-contracts/dto/create-template-contract.dto'

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

export class DataUpdateContractAttributeDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly idArea: string

  @IsString()
  @IsNotEmpty()
  readonly type: string

  @ValidateIf((object) => object.type === TypeContractAttributeValue.CONTRACT_ATTRIBUTE)
  @IsString()
  @IsNotEmpty()
  readonly valueAttribute?: string

  @IsBoolean()
  readonly isCreated: boolean
}

export class AnotherDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DataUpdateContractAttributeDto)
  contractAttributes?: DataUpdateContractAttributeDto[]

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
