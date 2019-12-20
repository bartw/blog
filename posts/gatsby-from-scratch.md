---
title: "Gatsby From Scratch"
date: "2019-12-19"
repo: "https://github.com/bartw/gatsby-from-scratch"
published: true
---
Time to start building.

First thing to do is make some technology choices. I'm pretty sure I want a static site generator for my blog. [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is my current favorite programming language. [React](https://reactjs.org/) is my current favorite UI library. This leaves me with [Next.js](https://nextjs.org/) or [Gatsby](https://www.gatsbyjs.org/). I went with Gatsby because I already built some stuff with it. Next.js is probably great too, maybe next time.

I'm not going to use a [starter](https://www.gatsbyjs.org/starters/) because I want to learn how to set everything up myself. Enough intro, I'm pulling up a terminal and start developping.

```shell
mkdir gatsby-from-scratch
cd gatsby-from-scratch
git init
touch .gitignore
echo "12" >> .nvmrc
nvm use
```

`.gitignore`

```
node_modules
.cache
public
```

I started by creating a fresh folder for my project.

In this folder I initiated a [Git](https://git-scm.com/) repo to be able to commit my work. I created a `.gitignore` file to exclude some folders from being commited.

I created an `.nvmrc` file so [nvm](https://github.com/nvm-sh/nvm) can make sure I'm on [node](https://nodejs.org/) 12. The `nvm use` command switches this terminal session to my preferred node version.

```shell
npm init -y
npm install --save react react-dom gatsby
echo "module.exports = {};" >> gatsby-config.js
mkdir src
mkdir src/pages
touch src/pages/index.js
```

```jsx
import React from "react";

export default () => <div>Hello world!</div>;
```

Next up I created an [npm](https://www.npmjs.com/) package and installed React and Gatsby. I added an empty Gatsby configuration to `gatsby-config.js`.

Then I created `index.js` file with the famous "Hello world!" words.

```shell
npm install --save-dev prettier
echo "{}" >> .prettierrc
```

Gatsby ships with [Eslint](https://www.gatsbyjs.org/docs/eslint/) built in. But I also like me some [Prettier](https://prettier.io/) on the side.

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

All I need now is some scripts in `package.json` to be able to do all the things.

```shell
npm run format
npm start
```

Now I can browse to `http://localhost:8000/` and see my Gatsby site running!
