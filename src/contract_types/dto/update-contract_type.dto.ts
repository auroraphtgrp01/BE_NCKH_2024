import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

export class UpdateContractTypeDto {
  @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
  id: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.NAME_MUST_BE_A_STRING })
  @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
  readonly name: string

  @IsOptional()
  @IsString({ message: RESPONSE_MESSAGES.DESCRIPTION_MUST_BE_A_STRING })
  @MaxLength(100, { message: RESPONSE_MESSAGES.DESCRIPTION_LENGTH })
  readonly description: string
}
