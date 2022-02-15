import {
  Injectable,
  HttpService,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { Endpoint } from '../../interfaces/endpoint.interface';
import { Connector } from '../../interfaces/connector.interface';

@Injectable()
export class RegistrationService implements OnApplicationBootstrap {
  constructor(private http: HttpService, private config: ConfigService) {}

  onApplicationBootstrap(): any {
    this.register().subscribe((data) => {
      console.log(data);
    });
  }

  register() {
    const baseUrl =
      'http://' +
      this.config.get<string>('ipAddress') +
      ':' +
      this.config.get<string>('port');

    const configEndpoint: Endpoint = {
      name: 'config',
      address: this.config.get<string>('ipAddress'),
      port: this.config.get<string>('port'),
      path: '/config',
    };

    const infoEndpoint: Endpoint = {
      name: 'info',
      address: this.config.get<string>('ipAddress'),
      port: this.config.get<string>('port'),
      path: '/info',
    };

    const connector: Connector = {
      base_url: baseUrl,
      description: this.config.get<string>('displayName'),
      endpoints: [infoEndpoint, configEndpoint],
      name: this.config.get<string>('name') + '-' + Date.now(),
      version: '1.0',
    };
    return this.http
      .post(this.config.get<string>('registrationUrl'), connector)
      .pipe(map((response) => response.data));
  }
}
