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

export class StageDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id?: string

  @ValidateIf((object: any) => object.id === undefined || object.percent !== undefined)
  @IsNumber()
  @IsNotEmpty()
  @Validate((object: any) => object.percent > 0)
  percent?: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string
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

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => StageDto)
  readonly stage?: StageDto
}
