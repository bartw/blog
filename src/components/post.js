import React from "react";
import { Link } from "gatsby";
import rehypeReact from "rehype-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Paragraph from "./paragraph";
import ExternalLink from "./external-link";
import TextExternalLink from "./text-external-link";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { p: Paragraph, a: TextExternalLink }
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
      <div className="text-sm text-gray-600">
        <time dateTime={date}>{date}</time>
        {repo && (
          <ExternalLink className="ml-2" href={repo}>
            <FontAwesomeIcon icon={faGithub} />
          </ExternalLink>
        )}
      </div>
      <WithLink slug={slug}>
        <h1 className="font-bold">{title}</h1>
      </WithLink>
    </header>
    <div className="mt-2">{renderAst(htmlAst)}</div>
    {slug && (
      <Link className="text-sm text-gray-600" to={slug}>
        Click here to continue reading
      </Link>
    )}
  </article>
);
