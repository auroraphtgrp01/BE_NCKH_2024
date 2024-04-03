import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class CreateInvitationDto {
  @IsNotEmpty({ message: RESPONSE_MESSAGES.PARTY_SENDER_HAS_TO_BE_INDENTIFIED })
  @IsString({ message: RESPONSE_MESSAGES.ID_PARTY_SENDER_MUST_BE_A_STRING })
  @Length(36, 36, { message: RESPONSE_MESSAGES.INVALID_ID_PARTY_SENDER })
  idPartySender: string

  @IsString({ message: RESPONSE_MESSAGES.EMAIL_MUST_BE_A_STRING })
  @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
  @IsEmail({}, { message: RESPONSE_MESSAGES.EMAIL_IS_INVALID })
  email: string

  @IsString({ message: RESPONSE_MESSAGES.MESSAGE_MUST_BE_A_STRING })
  @MinLength(10, { message: RESPONSE_MESSAGES.MESSAGE_TOO_SHORT })
  message: string
}
