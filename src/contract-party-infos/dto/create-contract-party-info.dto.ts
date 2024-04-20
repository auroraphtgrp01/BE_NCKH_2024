import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateContractPartyInfoDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly partyInfoId: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly contractId: string
}
