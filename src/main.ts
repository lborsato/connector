import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const options = new DocumentBuilder()
  //   .setTitle(process.env.NAME)
  //   .setDescription(`The ${process.env.NAME} API description`)
  //   .setVersion(process.env.VERSION)
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
