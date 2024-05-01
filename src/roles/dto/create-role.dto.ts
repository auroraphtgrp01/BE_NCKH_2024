import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class CreateRoleDto {
  @IsString({ message: RESPONSE_MESSAGES.NAME_MUST_BE_A_STRING })
  @IsNotEmpty()
  readonly name: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description?: string
}
