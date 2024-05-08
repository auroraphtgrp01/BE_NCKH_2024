import { ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { MailService } from './mailer.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { join } from 'path'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS')
          }
        },
        defaults: {
          from: 'No Reply <BLOCKCHAIN_NCKH_2024>'
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter()
        },
        options: {
          strict: false
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
