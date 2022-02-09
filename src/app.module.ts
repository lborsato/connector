import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { RegistrationService } from './services/registration/registration.service';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, RegistrationService],
})
export class AppModule {}
