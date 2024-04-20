import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { Queue } from 'bullmq'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath('/bull-admin')
  const aQueue = app.get<Queue>(`BullQueue_deployContract`)
  const bQueue =app.get<Queue>(`BullQueue_sendInvitation`)
  createBullBoard({
    queues: [new BullMQAdapter(aQueue), new BullMQAdapter(bQueue)],
    serverAdapter
  })
  app.use('/bull-admin', serverAdapter.getRouter())
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization'
  })
  app.useGlobalPipes(new ValidationPipe())
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  app.use(cookieParser())
  const config = new DocumentBuilder()
  .setTitle('NCKH_2024 APIs Documentation')
  .setDescription('NCKH_2024 APIs Documentation')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
      in: 'header'
    },
    'token'
  )
  .addSecurityRequirements('token')
  .build()
const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api', app, document)
  await app.listen(3000)
}
bootstrap()
