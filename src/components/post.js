import React from "react";
import { Link } from "gatsby";

export default ({ date, slug, title, html }) => (
  <article className="mt-4">
    <header>
      <time className="text-sm text-gray-600" dateTime={date}>
        {date}
      </time>
      <Link to={slug}>
        <h1 className="font-bold no-underline hover:underline">{title}</h1>
      </Link>
    </header>
    <div className="mt-2" dangerouslySetInnerHTML={{ __html: html }} />
  </article>
);
