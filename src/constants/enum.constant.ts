export enum ETypeContractAttribute {
  CONTRACT_HEADER = 'Contract Header',
  CONTRACT_HEADER_DATE = 'Contract Header Date',
  CONTRACT_TITLE = 'Contract Title',
  CONTRACT_NUMBER = 'Contract Number',
  CONTRACT_TEXT = 'Contract Text',
  CONTRACT_HEADING_1 = 'Contract Heading 1',
  CONTRACT_HEADING_2 = 'Contract Heading 2',
  CONTRACT_ATTRIBUTE = 'Contract Attribute',
  CONTRACT_SIGNATURE = 'Contract Signature',
  CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED = 'Contract Attribute Party Address Wallet Joined',
  CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE = 'Contract Attribute Address Wallet Receive',
  CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND = 'Contract Attribute Address Wallet Send',
  CONTRACT_PARTY_INFO = 'Contract Party Info',
  TOTAL_AMOUNT = 'Total Amount'
}

export enum ERoles {
  ADMIN = 'Admin',
  CUSTOMER = 'Customer',
  SUPPLIER = 'Supplier',
  ARBITRATION = 'Arbitration'
}

export enum EContractType {
  CONTRACT = 'Contract',
  DISPUTE = 'Dispute'
}

export enum EOrderStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export enum EVoting {
  PENDING = 'Pending',
  CUSTOMER = 'Customer',
  SUPPLIER = 'Supplier'
}

export enum EStageStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ENFORCE = 'ENFORCE',
  OUT_OF_DATE = 'OUT_OF_DATE',
  WITHDRAWN = 'WITHDRAWN'
}

export enum ERoleParticipant {
  SENDER = 'Sender Users',
  RECEIVER = 'Receiver Users',
  ARBITRATION = 'Arbitration',
  PARTICIPANT = 'Participant'
}
