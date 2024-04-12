import { IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID, Length, MinLength } from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class CreatePartyInfoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: RESPONSE_MESSAGES.REPRESENTATIVE_NAME_LENGTH })
  readonly representativeName: string

  @IsString()
  @IsNotEmpty()
  readonly position: string

  @IsNumberString()
  @Length(10, 10, { message: RESPONSE_MESSAGES.PHONE_NUMBER_LENGTH })
  readonly phoneNumber: string

  @IsString()
  @MinLength(10, { message: RESPONSE_MESSAGES.THE_ADDRESS_MUST_BE_PROVIDED_IN_FULL_AND_CLEARLY })
  readonly address: string

  @IsOptional()
  @IsString()
  readonly description: string

  @IsUUID()
  @IsNotEmpty()
  readonly partiesId: string
}
