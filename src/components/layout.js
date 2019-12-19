import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import logo from "../images/logo.svg";

export default ({ children }) => {
  return (
    <>
      <Helmet>
        <title>Blog - Bart Wijnants</title>
        <meta name="description" content="Bart Wijnants' Blog" />
      </Helmet>
      <header className="bg-white text-black p-10">
        <Link to="/">
          <img className="inline-block w-10" alt="logo" src={logo} />
          <h1 className="inline-block ml-4 align-middle text-xl">
            Bart Wijnants's Blog
          </h1>
        </Link>
      </header>
      <main className="text-base">{children}</main>
      <footer className="bg-green-500 text-black text-xs px-10 py-5 text-center">
        Fork me on{" "}
        <a
          href="https://github.com/bartw/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline hover:underline"
        >
          GitHub
        </a>
      </footer>
    </>
  );
};
