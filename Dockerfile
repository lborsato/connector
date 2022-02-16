FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

RUN npm i --save @nestjs/serve-static

RUN npm install --save @nestjs/swagger swagger-ui-express

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

RUN npm i --save @nestjs/serve-static

RUN npm install --save @nestjs/swagger swagger-ui-express

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
