import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailPayload } from 'src/mailer/mail-payload.i';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }
    async sendMail(payload: MailPayload) {
        await this.mailerService.sendMail({
            to: payload.to,
            from: payload.from,
            subject: 'Invitation to enter into an electronic contract',
            template: 'invition',
            context: {
                receiver: payload.receiver,
                contractName: payload.contractName,
                addressWalletSender: payload.addressWalletSender,
                messages: payload.messages,
                link: payload.link,
            }
        })
        return true
    }
}
