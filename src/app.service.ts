import { Injectable } from '@nestjs/common';

const IDENTITY = 'Fortis';
const DISPLAY_NAME = 'Fortis Connector';
const ICON = 'Fortis';
const VERSION = '1.0.0';
const COMPANY = 'alchemii';
const DEMO_URL = 'https://fiddle.sencha.com';
const HELLO_URL =
  'http://microservice.local-dev.goboomtown.com:3000/helloworld.html';
const TRANSACTIONS_URL = 'http://34.150.191.191:3000/transactions';

export class Customer {
  id: string;
  name: string;
}

export interface Identity {
  name: string;
  displayName: string;
  version: string;
  company: string;
  icon: string;
  hasConfig: boolean;
  hasInfo: boolean;
}

export interface Data {
  url: string;
}

export interface Hello {
  msg: string;
}

@Injectable()
export class AppService {
  private customer: Customer;
  getIdentity(): Identity {
    return {
      name: IDENTITY,
      displayName: DISPLAY_NAME,
      version: VERSION,
      company: COMPANY,
      icon: ICON,
      hasConfig: true,
      hasInfo: true,
    };
  }

  getConfig(): Data {
    return {
      url: DEMO_URL,
    };
  }

  getInfo(): Data {
    return {
      url: TRANSACTIONS_URL,
    };
  }

  getHello(): string {
    return 'Hello World!';
  }

  setCustomer(customer: Customer): void {
    console.log('Customer: ', customer);
    this.customer = customer;
  }

  getTransactions(): string {
    // let html = '<h2>Last Three Transactions for ' + this.customer.id + ':</h2>';
    let html = '<h2>Last Three Transactions:</h2>';
    html += '<table width="100%">';
    html += '<tr><th>Date</th><th>Description</th><th>Amount</th></tr>';
    html += '<tr><th>01/30/2022</th><th>Nespresso</th><th>$25.88</th></tr>';
    html += '<tr><th>01/21/2022</th><th>Ralphs</th><th>$101.22</th></tr>';
    html += '<tr><th>01/19/2022</th><th>Best Buy</th><th>$722.22</th></tr>';
    html += '</table>';
    return html;
  }
}
