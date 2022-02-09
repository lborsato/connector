// configuration.ts

export const configuration = () => ({
  name: process.env.NAME,
  displayName: process.env.DISPLAY_NAME,
  company: process.env.COMPANY,
  version: process.env.VERSION,
  url: process.env.URL,
});
