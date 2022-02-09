import {
  Injectable,
  HttpService,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

const REGISTRATION_URL =
  'https://service-directory-proxy-xzww6y6oeq-uc.a.run.app/v1/connector';

const CONNECTOR_URL = 'http://34.150.191.191';
const CONNECTOR_IP = '34.150.191.191';
const CONNECTOR_PORT = '3000';

export interface Connector {
  name: string;
  description: string;
  version: string;
  base_url: string;
  endpoints: Endpoint[];
}

export interface Endpoint {
  name: string;
  address: string;
  port: string;
  path: string;
}

@Injectable()
export class RegistrationService implements OnApplicationBootstrap {
  constructor(private http: HttpService) {}

  onApplicationBootstrap(): any {
    this.register().subscribe((data) => {
      console.log(data);
    });
  }

  register() {
    const configEndpoint: Endpoint = {
      name: 'config',
      address: CONNECTOR_IP,
      port: CONNECTOR_PORT,
      path: '/config',
    };

    const infoEndpoint: Endpoint = {
      name: 'info',
      address: CONNECTOR_IP,
      port: CONNECTOR_PORT,
      path: '/info',
    };

    const connector: Connector = {
      base_url: CONNECTOR_URL,
      description: 'Fortis Demo Connector',
      endpoints: [configEndpoint, infoEndpoint],
      name: 'fortis-connector-' + Date.now(),
      version: '1.0',
    };
    // console.log(connector);
    return this.http
      .post(REGISTRATION_URL, connector)
      .pipe(map((response) => response.data));
  }
}
