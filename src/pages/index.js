import React from "react";
import { Helmet } from "react-helmet";

export default () => (
  <>
    <Helmet>
      <title>Blog - Bart Wijnants</title>
      <meta name="description" content="Bart Wijnants' Blog" />
    </Helmet>
    <header className="bg-black text-white p-10">
      <h1 className="text-lg">Bart Wijnants's Blog</h1>
    </header>
    <main className="bg-white text-black p-10">Hello blog!</main>
    <footer className="bg-black text-white">
      <p className="text-xs px-10 py-5">
        Fork me on{" "}
        <a
          href="https://github.com/bartw/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline hover:underline"
        >
          GitHub
        </a>
      </p>
    </footer>
  </>
);
