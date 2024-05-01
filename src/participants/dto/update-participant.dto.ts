import { PartialType } from '@nestjs/swagger'
import { CreateParticipantDto } from './create-participant.dto'
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

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
}
