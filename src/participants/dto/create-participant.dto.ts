import { ParticipantStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  Validate,
  ValidateNested
} from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { PermissionDto } from 'src/contracts/dto/create-contract.dto'

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly contractId: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsObject()
  @ValidateNested()
  @Type(() => PermissionDto)
  readonly permission: PermissionDto

  @IsOptional()
  userId?: string

  @IsOptional()
  status?: any
}
export class InvitationDto {
  @IsString({ message: RESPONSE_MESSAGES.EMAIL_TO_MUST_BE_A_STRING })
  @IsNotEmpty()
  @IsEmail({}, { message: RESPONSE_MESSAGES.EMAIL_TO_IS_INVALID })
  readonly email: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.MESSAGE_MUST_BE_A_STRING })
  readonly messages?: string

  @IsObject()
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

export class SendInvitationsDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  contractName?: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly contractId: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => InvitationDto)
  invitation: InvitationDto[]
}
