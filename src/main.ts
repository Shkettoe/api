import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.use(cookieParser())
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  })

  const config = new DocumentBuilder()
    .setTitle('Flashcards api')
    .setDescription('An api for Flashcards')
    .setVersion('0.0.1')
    .addTag('flashcards')
    .build()
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (a: string, b: string) => b,
  })
  SwaggerModule.setup('api', app, document, { explorer: true })

  await app.listen(5000)
}
bootstrap()
