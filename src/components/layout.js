import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import logo from "../images/logo.svg";
import ExternalLink from "./external-link";

export default ({ children }) => (
  <>
    <Helmet>
      <title>Blog - Bart Wijnants</title>
      <meta name="description" content="Bart Wijnants' Blog" />
    </Helmet>
    <div className="bg-white p-10 antialiased">
      <header className="flex items-center justify-between flex-wrap text-black text-xl">
        <Link to="/">
          <img className="inline-block w-10 mr-4" alt="logo" src={logo} />
          <h1 className="inline-block mr-4 align-middle font-bold">
            Bart Wijnants's Blog
          </h1>
        </Link>
        <div className="align-middle">
          <ExternalLink to="https://bartwijnants.be">
            <FontAwesomeIcon icon={faAddressCard} fixedWidth />
          </ExternalLink>
          <ExternalLink className="ml-2" to="https://github.com/bartw/blog">
            <FontAwesomeIcon icon={faGithub} fixedWidth />
          </ExternalLink>
        </div>
      </header>
      <main className="text-gray-900">{children}</main>
    </div>
  </>
);
