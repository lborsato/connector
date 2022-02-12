import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class AppService {
  private customer: Customer;

  setCustomer(customer: Customer): void {
    this.customer = customer;
  }

  getTransactions(
    object: string | string[] | undefined,
    object_id: string | string[] | undefined,
  ): string {
    // let html = '<h2>Last Three Transactions for ' + this.customer.id + ':</h2>';
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
    html += '<tr><th>' + Date().toLocaleLowerCase('en-US') + '</th><th>Nespresso</th><th>$25.88</th></tr>';
    html += '<tr><th>' + Date().toLocaleLowerCase('en-US') + '</th><th>Ralphs</th><th>$101.22</th></tr>';
    html += '<tr><th>' + Date().toLocaleLowerCase('en-US') + '</th><th>Best Buy</th><th>$722.22</th></tr>';
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
