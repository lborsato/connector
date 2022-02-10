import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { AppService, Identity, Data, Customer } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

const OBJECT = 'object';
const OBJECT_ID = 'object_id';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getIdentity(): Identity {
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
    this.appService.setCustomer(customer);
    return customer;
  }

  @Get('info')
  getInfo(@Req() request: Request): Data {
    let url =
      'http://' +
      this.configService.get<string>('ipAddress') +
      ':' +
      this.configService.get<string>('port') +
      '/transactions';
    const object = request.query[OBJECT] as string;
    const object_id = request.query[OBJECT_ID] as string;
    if (object != undefined && object_id != undefined) {
      const query = '?object=' + object + '&object_id=' + object_id;
      url += query;
    }
    return {
      url: url,
    };
  }

  @Get('config')
  getConfig(): Data {
    return {
      url:
        'http://' +
        this.configService.get<string>('ipAddress') +
        ':' +
        this.configService.get<string>('port') +
        '/form',
    };
  }

  @Get('transactions')
  getTransactions(@Req() request: Request, @Res() response: Response) {
    const object = request.query[OBJECT] as string;
    const object_id = request.query[OBJECT_ID] as string;
    response.set('Content-Type', 'text/html');
    response.send(this.appService.getTransactions(object, object_id));
  }

  @Get('form')
  getForm(@Res() response: Response) {
    response.set('Content-Type', 'text/html');
    response.send(this.appService.getForm());
  }
}
