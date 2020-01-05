---
title: "Deploy A NestJS API To Heroku"
date: "2020-01-05"
repo: "https://github.com/bartw/deploy-nestjs-api-to-heroku"
summary: "Deploy a NestJS api to Heroku in 5 minutes."
published: false
---

`main.ts`

```js
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // highlight-next-line
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

```shell
npm install --save-dev rimraf
npm install --save rxjs
```

`package.json`

```json
"scripts": {
    // highlight-next-line
    "build": "npm run clean && nest build",
    // highlight-next-line
    "clean": "rimraf dist",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start --watch",
    // highlight-next-line
    "start:prod": "node dist/main"
  }
```

`Procfile`

```
web: npm run start:prod
```

![New App](../images/deploy-nestjs-api-to-heroku-01.png)

![Create New App](../images/deploy-nestjs-api-to-heroku-02.png)

![Connect To GitHub](../images/deploy-nestjs-api-to-heroku-03.png)

![Automatic Deploys](../images/deploy-nestjs-api-to-heroku-04.png)

![Build In Progress](../images/deploy-nestjs-api-to-heroku-05.png)

https://deploy-nestjs-api-to-heroku.herokuapp.com/hello/world
