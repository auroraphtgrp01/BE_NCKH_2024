import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class CreateInvitationDto {
  @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
  @Length(42, 42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
  addressWalletSender: string

  @IsString({ message: RESPONSE_MESSAGES.EMAIL_TO_MUST_BE_A_STRING })
  @IsNotEmpty()
  @IsEmail({}, { message: RESPONSE_MESSAGES.EMAIL_TO_IS_INVALID })
  to: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.MESSAGE_MUST_BE_A_STRING })
  @MinLength(10, { message: RESPONSE_MESSAGES.MESSAGE_TOO_SHORT })
  messages: string

  @IsString({ message: RESPONSE_MESSAGES.CONTRACT_TITLE_MUST_BE_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.CONTRACT_TITLE_LENGTH })
  contractName: string
}
