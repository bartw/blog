import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import logo from "../images/logo.svg";
import ExternalLink from "./external-link";

export default ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="bg-white px-5 md:px-10 lg:px-32 py-10 antialiased">
        <header className="flex justify-between flex-wrap text-black text-xl">
          <Link to="/">
            <img className="inline-block w-16" alt="logo" src={logo} />
          </Link>
          <div>
            <ExternalLink href="https://bartwijnants.be">
              <FontAwesomeIcon icon={faAddressCard} fixedWidth />
            </ExternalLink>
            <ExternalLink className="ml-2" href="https://github.com/bartw/blog">
              <FontAwesomeIcon icon={faGithub} fixedWidth />
            </ExternalLink>
          </div>
        </header>
        <main className="text-gray-900">{children}</main>
      </div>
    </>
  );
};
