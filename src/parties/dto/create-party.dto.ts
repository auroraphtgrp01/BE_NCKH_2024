import { IsEmail, IsNumberString, IsString, Length, MinLength } from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class CreatePartyDto {
  @IsString()
  @Length(3, 50, { message: RESPONSE_MESSAGES.PARTY_NAME_LENGTH })
  readonly partyName: string

  @IsString()
  @Length(10, 10, { message: RESPONSE_MESSAGES.TAX_CODE_LENGTH })
  readonly taxCode: string

  @IsString()
  @IsEmail()
  readonly email: string

  @IsNumberString()
  @Length(10, 10, { message: RESPONSE_MESSAGES.PHONE_NUMBER_LENGTH })
  readonly phoneNumber: string

  @IsString()
  @MinLength(10, { message: RESPONSE_MESSAGES.THE_ADDRESS_MUST_BE_PROVIDED_IN_FULL_AND_CLEARLY })
  readonly address: string
}
