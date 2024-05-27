export interface MailPayload {
  to: string
  from: string
  receiver: string
  contractName: string
  addressWalletSender: string
  messages: string
  link: string
}

export interface RequestSurveyPayload {
  to: string
  from: string
  receiver: string
  surveyCode: string
  addressWalletSender: string
  messages: string
  link: string
}

export interface ResendQuotationPayload {
  to: string
  from: string
  receiver: string
  supplierName: string
  surveyCode: string
  messages: string
  link: string
}
