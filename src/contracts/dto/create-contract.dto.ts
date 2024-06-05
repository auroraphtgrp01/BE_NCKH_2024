import { ParticipantStatus } from '@prisma/client'
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
  Validate,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { EContractType, ERoleParticipant, ETypeContractAttribute } from 'src/constants/enum.constant'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'

export class CreateContractAttributesDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly contractId: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly templateContractId: string
}

export class TemplateContractDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string

  @IsString()
  @IsNotEmpty()
  readonly img: string

  @IsString()
  @IsNotEmpty()
  readonly name: string
}

export class PermissionDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly CHANGE_STATUS_CONTRACT: boolean

  @IsNotEmpty()
  @IsBoolean()
  readonly EDIT_CONTRACT: boolean

  @IsNotEmpty()
  @IsBoolean()
  readonly INVITE_PARTICIPANT: boolean

  @IsNotEmpty()
  @IsBoolean()
  readonly READ_CONTRACT: boolean

  @IsNotEmpty()
  @IsBoolean()
  readonly SET_OWNER_PARTY: boolean

  @IsString()
  @IsNotEmpty()
  readonly ROLES: ERoleParticipant
}

export class GasPriceDto {
  @IsNumber()
  readonly price: string

  @IsString()
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  readonly addressWallet: string

  @IsString()
  readonly reason: string
}

export class CreateEmptyContractDto {
  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  readonly addressWallet: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Validate((object: any) => object.type === EContractType.DISPUTE)
  type?: string

  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @IsNotEmpty()
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  readonly name: string

  @IsString()
  @IsOptional()
  readonly parentId?: string

  @IsString()
  @IsOptional()
  readonly status?: string

  @IsString()
  @IsOptional()
  readonly contractAddress?: string
}

export class CreateContractDto {
  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  readonly addressWallet: string

  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_ADDRESS_MUST_BE_STRING })
  @IsNotEmpty()
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  readonly name: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvitationsDto)
  readonly invitation?: InvitationsDto[]

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Validate((object: any) => object.type === EContractType.DISPUTE)
  type?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly templateId?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly orderId?: string

  @IsString()
  @IsNotEmpty()
  readonly rolesOfCreator: ERoleParticipant

  @ValidateIf((object: any) => object.templateId !== undefined)
  @IsBoolean()
  readonly isCreateAttributeValue?: boolean
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
  readonly email: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.MESSAGE_MUST_BE_A_STRING })
  @MinLength(10, { message: RESPONSE_MESSAGES.MESSAGE_TOO_SHORT })
  readonly messages?: string

  @IsObject()
  @ValidateNested()
  @Type(() => PermissionDto)
  readonly permission: PermissionDto

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly userId?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly status?: ParticipantStatus
}

export class CreateDisputeContractDto {
  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  readonly addressWallet: string

  @IsNumber()
  @IsNotEmpty()
  readonly totalAmount: number

  @IsString()
  @IsNotEmpty()
  readonly customer: string

  @IsString()
  @IsNotEmpty()
  readonly supplier: string

  @IsString()
  @IsNotEmpty()
  readonly parentId: string
}
