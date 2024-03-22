import { Type } from "class-transformer";
import { IsBooleanString, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";
import { RESPONSE_MESSAGES } from "src/constants/responseMessage";

export class CreateUserDto {
    @IsString({ message: RESPONSE_MESSAGES.NAME_MUST_BE_A_STRING })
    @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
    readonly name: string

    @IsString({ message: RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING })
    @MaxLength(42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
    @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
    @MinLength(42, { message: RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH })
    readonly addressWallet: string

    @IsString({ message: RESPONSE_MESSAGES.EMAIL_MUST_BE_A_STRING })
    @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
    @IsEmail({}, { message: RESPONSE_MESSAGES.EMAIL_IS_INVALID })
    readonly email: string

    @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
    readonly gender: string

    @IsDateString({}, { message: RESPONSE_MESSAGES.DATEOFBIRTH_MUST_BE_A_DATE })
    @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
    readonly dateOfBirth: string

    @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
    readonly phoneNumber: string

    @IsNotEmpty({ message: RESPONSE_MESSAGES.FIELD_IS_REQUIRED })
    @MaxLength(12)
    @MinLength(12)
    readonly indentifyNumber: string
}
