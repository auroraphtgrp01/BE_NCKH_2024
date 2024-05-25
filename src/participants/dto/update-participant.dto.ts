import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
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

  @ValidateIf((object: any) => object.id === undefined)
  @IsString()
  @IsNotEmpty()
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
}
