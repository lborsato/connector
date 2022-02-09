import {
  Injectable,
  HttpService,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

const REGISTRATION_URL =
  'https://service-directory-proxy-xzww6y6oeq-uc.a.run.app/v1/connector';

// const CONNECTOR_URL = 'http://34.150.191.191';
// const CONNECTOR_IP = th;
// const CONNECTOR_PORT = '3000';

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
  constructor(
    private http: HttpService,
    private configService: ConfigService,
  ) {}

  onApplicationBootstrap(): any {
    this.register().subscribe((data) => {
      console.log(data);
    });
  }

  register() {
    const configEndpoint: Endpoint = {
      name: 'config',
      address: this.configService.get<string>('ipAddress'),
      port: this.configService.get<string>('port'),
      path: '/config',
    };

    const infoEndpoint: Endpoint = {
      name: 'info',
      address: this.configService.get<string>('ipAddress'),
      port: this.configService.get<string>('port'),
      path: '/info',
    };

    const connector: Connector = {
      base_url:
        'http://' +
        this.configService.get<string>('ipAddress') +
        ':' +
        this.configService.get<string>('port'),
      description: this.configService.get<string>('displayName'),
      endpoints: [configEndpoint, infoEndpoint],
      name: this.configService.get<string>('name') + Date.now(),
      version: '1.0',
    };
    // console.log(connector);
    return this.http
      .post(REGISTRATION_URL, connector)
      .pipe(map((response) => response.data));
  }
}
