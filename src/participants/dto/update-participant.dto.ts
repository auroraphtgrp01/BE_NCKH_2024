import { Type } from 'class-transformer'
import { IsBoolean, IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

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
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string

  @IsOptional()
  @IsString()
  readonly status?: string

  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email?: string

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PermissionDto)
  readonly permission?: PermissionDto
}
