// configuration.ts

import * as os from "os";

export const configuration = () => ({
  name: process.env.NAME,
  displayName: process.env.DISPLAY_NAME,
  company: process.env.COMPANY,
  version: process.env.VERSION,
  ipAddress: process.env.IP_ADDRESS,
  hostname: os.hostname(),
  port: process.env.PORT,
  url: 'http://' + process.env.IP_ADDRESS + ':' + process.env.PORT,
  registrationUrl: process.env.REGISTRATION_URL,
});
