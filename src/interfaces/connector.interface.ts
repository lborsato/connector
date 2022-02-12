import { Endpoint } from './endpoint.interface';

export interface Connector {
  name: string;
  description: string;
  version: string;
  base_url: string;
  endpoints: Endpoint[];
}
