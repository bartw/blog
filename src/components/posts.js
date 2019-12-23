import React from "react";
import Post from "../components/post";
import { usePosts } from "../hooks/use-posts";

export default () =>
  usePosts().map(({ id, slug, title, date, formattedDate, summary }) => (
    <Post
      key={id}
      slug={slug}
      title={title}
      date={date}
      formattedDate={formattedDate}
      summary={summary}
    />
  ));
