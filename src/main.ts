import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DateFormatInterceptor,
  DateFormat,
} from 'nestjs-date-format-interceptor/lib/date';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(
    new DateFormatInterceptor({ maxDeep: 6, format: DateFormat.toISOString }),
  );
  await app.listen(3000);
}
bootstrap();
