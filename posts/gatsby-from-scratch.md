---
title: "Gatsby From Scratch"
date: "2019-12-19"
---

Time to start building.

First thing to do is make some technology choices. I'm pretty sure I want a static site generator for my blog. JavaScript is my current favorite programming language. React is my current favorite UI library. This leaves me with Next.js or Gatsby. I went with Gatsby because I already built some stuff with it. Next.js is probably great too, maybe next time.

I'm not going to use a starter because I want to learn how to set everything up myself. Enough intro, I'm pulling up a terminal and start developping.

```shell
mkdir gatsby-from-scratch
cd gatsby-from-scratch
git init
echo "12" >> .nvmrc
echo "node_modules" >> .gitignore
nvm use
npm init -y
npm install --save react react-dom gatsby
npm install --save-dev prettier
echo "{}" >> .prettierrc
echo "module.exports = {};" >> gatsby-config.js
mkdir src
mkdir src/pages
touch src/pages/index.js
```

I need to ignore some stuff in `.gitignore`.

```
node_modules
.cache
public
```

The `index.js` needs some "Hello world!".

```js
import React from "react";

export default () => <div>Hello world!</div>;
```

Just some scripts in `package.json` to be able to start it all.

```json
"scripts": {
  "build": "gatsby build",
  "develop": "gatsby develop",
  "format": "prettier --write \"**/*.{js,jsx,json,md}\"",
  "start": "npm run develop",
  "serve": "gatsby serve",
  "clean": "gatsby clean"
}
```

Time to start

```shell
npm run format
npm start
```
