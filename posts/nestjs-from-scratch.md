---
title: "NestJS From Scratch"
date: "2020-01-04"
repo: "https://github.com/bartw/nestjs-from-scratch"
summary: "Create an api with NestJS without using a starter."
published: true
---

I've been blogging for over 2 weeks and I'm still no millionaire.

Only doing static stuff with Gatsby is not going to cut it. But I'm not the type to just give up. I'm going dynamic with [NestJS](https://nestjs.com/).

To get started I'm going to create a simple api without using the [Nest CLI](https://docs.nestjs.com/cli/overview) to scaffold a project. I hope I'll learn a little more about Nest by DIY'ing.

I'm going to keep the [Nest docs](https://docs.nestjs.com/) and their [Typescript starter](https://github.com/nestjs/typescript-starter) close to guide me through my adventure.

I'll start by getting a folder ready for some JavaScript development. I've done this before in my [Gatsby From Scratch](https://dev.bartwijnants.be/gatsby-from-scratch/) post.

```shell
mkdir nestjs-from-scratch
cd nestjs-from-scratch
git init
touch .gitignore
echo "12" >> .nvmrc
nvm use
npm init -y
```

```text:title=.gitignore
node_modules
dist
```

Now I'm ready to install the Nest dependencies. It makes sense that I need the core and common Nest packages. I also need [reflect-metadata](https://github.com/rbuckton/reflect-metadata).

I have to choose between [Express](https://expressjs.com/) and [Fastify](https://www.fastify.io/) as HTTP platform, I'll go with Express because that's the default and thus will make my life easier.

To be able to run Nest commands I install the Nest cli and to execute Typescript on Node I need [ts-node](https://github.com/TypeStrong/ts-node).

I just stole the Typescript configuration from the Nest Typescript starter, sometimes I just want to move fast.

```shell
npm i --save @nestjs/core @nestjs/common reflect-metadata @nestjs/platform-express
npm i --save-dev @nestjs/cli ts-node
touch tsconfig.json
touch tsconfig.build.json
```

```json:title=tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true
  },
  "exclude": ["node_modules", "dist"]
}
```

```json:title=tsconfig.build.json
{
  "extends": "./tsconfig.json"
}
```

Time to start coding.

I first read the documentation pages [First steps](https://docs.nestjs.com/first-steps), [Controllers](https://docs.nestjs.com/controllers), [Providers](https://docs.nestjs.com/providers) and [Modules](https://docs.nestjs.com/modules). I think I now grasp the basic structure of a Nest application.

The first feature I want to build is an api that says "Hello" to the consumer. I'll let the code speak for itself:

```shell
mkdir src
touch src/main.ts
touch src/app.module.ts
mkdir src/hello
touch src/hello/hello.module.ts
touch src/hello/hello.controller.ts
touch src/hello/hello.service.ts
```

```ts:title=src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

```ts:title=src/app.module.ts
import { Module } from "@nestjs/common";
import { HelloModule } from "./hello/hello.module";

@Module({ imports: [HelloModule] })
export class AppModule {}
```

```ts:title=src/hello/hello.module.ts
import { Module } from "@nestjs/common";
import { HelloController } from "./hello.controller";
import { HelloService } from "./hello.service";

@Module({
  controllers: [HelloController],
  providers: [HelloService]
})
export class HelloModule {}
```

```ts:title=src/hello/hello.controller.ts
import { Controller, Get, Param } from "@nestjs/common";
import { HelloService } from "./hello.service";

@Controller("hello")
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get(":name")
  sayHelloTo(@Param("name") name): string {
    return this.helloService.sayHelloTo(name);
  }
}
```

```ts:title=src/hello/hello.service.ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloService {
  sayHelloTo(name: string): string {
    return `Hello ${name}!`;
  }
}
```

After trying to format my code for about a gazillion times I realised that it's probably best to install [Prettier](https://prettier.io/) too.

```shell
npm install --save-dev prettier
echo "{}" >> .prettierrc
```

Only thing left to do is add a script to format my code and one to start my application.
After I run these scripts I can browse to `http://localhost:3000/hello/whatever` and see my NestJS api working!

```json:title=package.json
"scripts": {
  "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
  "start": "nest start --watch"
}
```

```shell
npm run format
npm start
```

That wasn't too hard.

There will be some work necessary to turn this into a production deploy. I'll keep that for the next post.
