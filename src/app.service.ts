import { Injectable } from '@nestjs/common';
import * as QueryString from 'querystring';

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
  url: string;
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

  setCustomer(customer: Customer): void {
    console.log('Customer: ', customer);
    this.customer = customer;
  }

  getTransactions(
    object: string | string[] | undefined,
    object_id: string | string[] | undefined,
  ): string {
    // let html = '<h2>Last Three Transactions for ' + this.customer.id + ':</h2>';
    console.log('object: ', object);
    let html = '';
    if (object != undefined && object_id != undefined) {
      html +=
        '<h2>Last Three Transactions for ' +
        object +
        ' ' +
        object_id +
        ':</h2>';
    } else {
      html += '<h2>Last Three Transactions for:</h2>';
    }
    html += '<table width="100%">';
    html += '<tr><th>Date</th><th>Description</th><th>Amount</th></tr>';
    html += '<tr><th>01/30/2022</th><th>Nespresso</th><th>$25.88</th></tr>';
    html += '<tr><th>01/21/2022</th><th>Ralphs</th><th>$101.22</th></tr>';
    html += '<tr><th>01/19/2022</th><th>Best Buy</th><th>$722.22</th></tr>';
    html += '</table>';
    return html;
  }

  getForm(): string {
    let html = '<h2>Sample Form</h2>';
    html += '<form>';
    html += '<label for="name">Name:</label>';
    html += '<input type="text" id="name" name="name" value="John Smith">';
    html += '<br>';
    html += '<label for="email">Email:</label>';
    html += '<input type="text" id="email" name="email" value="">';
    return html;
  }
}
