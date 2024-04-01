import { IsNotEmpty, IsOptional, IsString, MaxLength, maxLength } from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class CreateContractTypeDto {
  @IsString({ message: RESPONSE_MESSAGES.NAME_MUST_BE_A_STRING })
  @IsNotEmpty({ message: RESPONSE_MESSAGES.NAME_IS_REQUIRED })
  readonly name: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.DESCRIPTION_MUST_BE_A_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.DESCRIPTION_LENGTH })
  readonly description: string
}
