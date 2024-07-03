import { PartialType } from '@nestjs/swagger'
import { CreateImageDto } from './create-image.dto'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class UpdateImageDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string

  @IsString()
  @IsNotEmpty()
  readonly path: string

  @IsString()
  @IsNotEmpty()
  readonly handleType: 'Create' | 'Update' | 'Delete'
}
