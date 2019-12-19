import React from "react";
import { Link } from "gatsby";
import rehypeReact from "rehype-react";
import Paragraph from "./paragraph";
import TextExternalLink from "./text-external-link";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { p: Paragraph, a: TextExternalLink }
}).Compiler;

export default ({ date, slug, title, htmlAst }) => (
  <article className="mt-4">
    <header>
      <time className="text-sm text-gray-600" dateTime={date}>
        {date}
      </time>
      <Link to={slug}>
        <h1 className="font-bold no-underline hover:underline">{title}</h1>
      </Link>
    </header>
    <div className="mt-2">{renderAst(htmlAst)}</div>
    <Link className="text-sm text-gray-600" to={slug}>
      Click here to continue reading
    </Link>
  </article>
);
