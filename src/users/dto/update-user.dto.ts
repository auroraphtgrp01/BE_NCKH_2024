import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsNumberString, MaxLength, MinLength } from 'class-validator';
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage';

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UpdateUserPINDto {
    @MaxLength(6, { message: RESPONSE_MESSAGES.PIN_LENGTH_IS_6_DIGIT })
    @MinLength(6, { message: RESPONSE_MESSAGES.PIN_LENGTH_IS_6_DIGIT })
    @IsNumberString({}, { message: RESPONSE_MESSAGES.PIN_IS_NUMBER })
    PIN: string;
}