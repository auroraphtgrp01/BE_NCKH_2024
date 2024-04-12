import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateContractPartyInfoDto {
  @IsUUID()
  @IsNotEmpty()
  readonly partyInfoId: string

  @IsUUID()
  @IsNotEmpty()
  readonly contractId: string
}
