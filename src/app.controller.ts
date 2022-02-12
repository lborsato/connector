import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Identity } from './interfaces/identity.interface';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Data } from './interfaces/data.interface';

const ORG = 'org';
const OBJECT = 'object';
const OBJECT_ID = 'object_id';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private config: ConfigService,
  ) {}

  @Get()
  getIdentity(): Identity {
    return {
      name: this.config.get<string>('name'),
      displayName: this.config.get<string>('displayName'),
      version: this.config.get<string>('version'),
      company: this.config.get<string>('company'),
      icon: this.config.get<string>('icon'),
      url: this.config.get<string>('url'),
      hasConfig: true,
      hasInfo: true,
    };
  }

  @Get('info')
  getInfo(@Req() request: Request): Data {
    let orginalUrl = request.originalUrl;
    orginalUrl = orginalUrl.replace('/info', '/transactions');
    const url = request.protocol + '://' + request.get('host') + orginalUrl;
    return {
      url: url,
    };
  }

  @Get('config')
  getConfig() {
    return {};
    // return {
    //   url:
    //       'http://' +
    //       this.configService.get<string>('ipAddress') +
    //       ':' +
    //       this.configService.get<string>('port') +
    //       '/form',
    // };
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
