import { Controller, Get, Post, Response, Body } from '@nestjs/common';
import { AppService, Identity, Data, Customer } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIdentity(): Identity {
    return this.appService.getIdentity();
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
    return this.appService.getInfo();
  }

  @Get('transactions')
  htmlResponse(@Response() res) {
    res.set('Content-Type', 'text/html');
    res.send(this.appService.getTransactions());
  }
}
