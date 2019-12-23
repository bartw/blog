import React from "react";
import { Link } from "gatsby";
import Title from "./title";
import Time from "./time";
import PostLayout from "./post-layout";

export default ({ date, formattedDate, slug, title, summary }) => (
  <PostLayout
    header={
      <>
        <Time className="block" date={date} formattedDate={formattedDate} />
        <Link className="no-underline hover:underline" to={slug}>
          <Title>{title}</Title>
        </Link>
      </>
    }
    content={summary}
    footer={
      <Link className="no-underline hover:underline" to={slug}>
        Read this post →
      </Link>
    }
  />
);
