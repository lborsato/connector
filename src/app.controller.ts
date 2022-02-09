import { Controller, Get, Post, Response, Body } from '@nestjs/common';
import { AppService, Identity, Data, Customer } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getIdentity(): Identity {
    // return this.appService.getIdentity();
    console.log(this.configService.get('name'));
    return {
      name: this.configService.get<string>('name'),
      displayName: this.configService.get<string>('displayName'),
      version: this.configService.get<string>('version'),
      company: this.configService.get<string>('company'),
      icon: this.configService.get<string>('icon'),
      url: this.configService.get<string>('url'),
      hasConfig: true,
      hasInfo: true,
    };
  }

  @Post()
  setCustomer(@Body() customer: Customer) {
    console.log(customer);
    this.appService.setCustomer(customer);
    return customer;
  }

  @Get('config')
  getConfig(): Data {
    return this.appService.getConfig();
  }

  @Get('info')
  getInfo(): Data {
    // return this.appService.getInfo();
    return {
      url:
        'http://' +
        this.configService.get<string>('ipAddress') +
        ':' +
        this.configService.get<string>('port') +
        '/transactions',
    };
  }

  @Get('transactions')
  htmlResponse(@Response() res) {
    res.set('Content-Type', 'text/html');
    res.send(this.appService.getTransactions());
  }
}
