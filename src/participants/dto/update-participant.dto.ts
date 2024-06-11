import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
  ValidateIf,
  ValidateNested
} from 'class-validator'

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

export class UpdateParticipantDto {
  @ValidateIf((object: any) => object.userId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly id?: string

  @IsOptional()
  @ValidateIf((object: any) => object.id === undefined)
  @IsString()
  @IsUUID()
  readonly userId?: string

  @IsOptional()
  @IsString()
  readonly status?: string

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PermissionDto)
  readonly permission?: PermissionDto

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly vote?: string

  @IsOptional()
  readonly individual?: {
    receiver: string
    sender: string
  }
}
