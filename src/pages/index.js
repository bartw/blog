import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import Post from "../components/post";
import { usePosts } from "../hooks/use-posts";

export default () => {
  const posts = usePosts();
  return (
    <Layout>
      <Section>
        <p className="mt-2">
          Some time ago I noticed there was money to be made on Medium. I joined
          the Medium Partner Program and moved some of my posts behind the
          metered paywall. Time to become a millionaire.
        </p>
        <p className="mt-2">
          I quickly wrote a new blogpost and shared it on Reddit. This received
          some backlash as someone commented "Too bad you care about money more
          than sharing it. ¯\(ツ)/¯". That hurt, but it was also kinda true.
        </p>
        <p className="mt-2">
          This sparked a thought in my head. I can just create my own blog.
          Maybe add some ads. And still become a millionaire. I can just blog
          about building a blog. Easy does it.
        </p>
      </Section>
      <Section>
        {posts.map(({ id, slug, title, date, excerpt }) => (
          <Post key={id} slug={slug} title={title} date={date} html={excerpt} />
        ))}
      </Section>
    </Layout>
  );
};
