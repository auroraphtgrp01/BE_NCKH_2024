import { Transform, Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
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
import { ETypeContractAttribute } from 'src/constants/enum.constant'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'

export class CreateContractAttributesDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  contractId: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  templateContractId: string
}

export class TemplateContractDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string

  @IsString()
  @IsNotEmpty()
  img: string

  @IsString()
  @IsNotEmpty()
  name: string
}

export class PermissionDto {
  @IsNotEmpty()
  @IsBoolean()
  CHANGE_STATUS_CONTRACT: boolean

  @IsNotEmpty()
  @IsBoolean()
  EDIT_CONTRACT: boolean

  @IsNotEmpty()
  @IsBoolean()
  INVITE_PARTICIPANT: boolean

  @IsNotEmpty()
  @IsBoolean()
  READ_CONTRACT: boolean

  @IsNotEmpty()
  @IsBoolean()
  SET_OWNER_PARTY: boolean
}

export class GasPriceDto {
  @IsNumber()
  price: string

  @IsString()
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  addressWallet: string

  @IsString()
  reason: string
}

export class CreateEmptyContractDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id?: string

  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  addressWallet: string

  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @IsNotEmpty()
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  name: string
}

export class CreateContractDto {
  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  addressWallet: string

  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @IsNotEmpty()
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  name: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => InvitationsDto)
  invitation: InvitationsDto[]

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly templateId?: string
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

  @ValidateIf((object) => object.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE)
  @IsString()
  @IsNotEmpty()
  readonly valueAttribute?: string

  @IsBoolean()
  readonly isCreated: boolean
}

export class InvitationsDto {
  @IsString({ message: RESPONSE_MESSAGES.EMAIL_TO_MUST_BE_A_STRING })
  @IsNotEmpty()
  @IsEmail({}, { message: RESPONSE_MESSAGES.EMAIL_TO_IS_INVALID })
  email: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.MESSAGE_MUST_BE_A_STRING })
  @MinLength(10, { message: RESPONSE_MESSAGES.MESSAGE_TOO_SHORT })
  messages: string

  @IsObject()
  @ValidateNested()
  @Type(() => PermissionDto)
  permission: PermissionDto
}
