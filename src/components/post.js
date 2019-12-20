import React from "react";
import { Link } from "gatsby";
import rehypeReact from "rehype-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faComments, faEye } from "@fortawesome/free-regular-svg-icons";
import { faStar, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import Paragraph from "./paragraph";
import ExternalLink from "./external-link";
import TextExternalLink from "./text-external-link";
import Header from "./header";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { p: Paragraph, a: TextExternalLink, h2: Header }
}).Compiler;

const WithLink = ({ slug, children }) =>
  slug ? (
    <Link className="no-underline hover:underline" to={slug}>
      {children}
    </Link>
  ) : (
    children
  );

export default ({ date, slug, title, repo, htmlAst }) => (
  <article className="mt-4">
    <header>
      <div className="flex justify-between flex-wrap text-sm text-gray-600">
        <time className="block mr-2" dateTime={date}>
          {date}
        </time>
        {!slug && repo && (
          <ExternalLink className="block" href={repo}>
            <FontAwesomeIcon icon={faEye} /> watch,{" "}
            <FontAwesomeIcon icon={faStar} /> star or{" "}
            <FontAwesomeIcon icon={faCodeBranch} /> fork on{" "}
            <FontAwesomeIcon icon={faGithub} />
          </ExternalLink>
        )}
      </div>
      <WithLink slug={slug}>
        <h1 className="font-bold">{title}</h1>
      </WithLink>
    </header>
    <div className="mt-2">{renderAst(htmlAst)}</div>
    <footer className="text-sm text-gray-600">
      {slug && <Link to={slug}>Click here to continue reading</Link>}
      {!slug && repo && (
        <ExternalLink className="block mt-4" href={`${repo}/issues`}>
          <FontAwesomeIcon icon={faComments} />
          <span className="ml-2">
            Typos, problems or comments? Click here to connect using GitHub
            issues.
          </span>
        </ExternalLink>
      )}
    </footer>
  </article>
);
