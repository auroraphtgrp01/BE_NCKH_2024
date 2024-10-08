import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { MailPayload, RequestSurveyPayload } from 'src/mailer/mail-payload.i'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(payload: MailPayload) {
    await this.mailerService.sendMail({
      to: payload.to,
      from: payload.from,
      subject: 'Invitation to enter into an electronic contract',
      template: 'invitation',
      context: {
        receiver: payload.receiver,
        contractName: payload.contractName,
        addressWalletSender: payload.addressWalletSender,
        messages: payload.messages,
        link: payload.link
      }
    })
    return true
  }

  async sendRequestSurvey(payload: RequestSurveyPayload) {
    await this.mailerService.sendMail({
      to: payload.to,
      from: payload.from,
      subject: 'Request a Product Quote',
      template: 'invitation',
      context: {
        receiver: payload.receiver,
        surveyCode: payload.surveyCode,
        addressWalletSender: payload.addressWalletSender,
        messages: payload.messages,
        link: payload.link
      }
    })
    return true
  }
}
