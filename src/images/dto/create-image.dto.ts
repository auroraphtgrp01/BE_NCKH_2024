import { IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator'

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  path: string

  @ValidateIf((object) => object.supplierId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId?: string

  @ValidateIf((object) => object.productId === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  supplierId?: string
}
