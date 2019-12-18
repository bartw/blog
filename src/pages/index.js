import React from "react";
import { Helmet } from "react-helmet";
import logo from "../images/logo.svg";

export default () => (
  <>
    <Helmet>
      <title>Blog - Bart Wijnants</title>
      <meta name="description" content="Bart Wijnants' Blog" />
    </Helmet>
    <header className="bg-green-500 text-black px-10 py-5">
      <img className="inline-block w-10" alt="logo" src={logo} />
      <h1 className="inline-block ml-4 align-middle text-xl">
        Bart Wijnants's Blog
      </h1>
    </header>
    <main className="bg-white text-black px-10 py-5 text-base">
      <article>
        <header>
          <h1 className="font-bold">Gatsby from scratch</h1>
          <time className="mt-2 text-sm text-gray-600" dateTime="2019-12-18">
            December 18, 2019
          </time>
        </header>
        <div className="mt-4">
          <p className="mt-2">
            A couple of weeks ago I noticed there was money to be made on
            Medium. I joined the Medium Partner Program and moved some of my
            posts behind the metered paywall. Time to become a millionaire.
          </p>
          <p className="mt-2">
            I quickly wrote a new blogpost and shared it on Reddit. This
            received some backlash as someone commented "Too bad you care about
            money more than sharing it. ¯\(ツ)/¯". That hurt, but it was also
            kinda true.
          </p>
          <p className="mt-2">
            This sparked a thought in my head. I can just create my own blog.
            Maybe add some ads. And still become a millionaire. I can just blog
            about building a blog. Easy does it.
          </p>
        </div>
      </article>
    </main>
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
