import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import Post from "../components/post";
import Paragraph from "../components/paragraph";
import TextExternalLink from "../components/text-external-link";
import { usePosts } from "../hooks/use-posts";

export default () => {
  const posts = usePosts();
  return (
    <Layout>
      <Section>
        <Paragraph>
          Some time ago I noticed there was money to be made on{" "}
          <TextExternalLink href="https://medium.com/">Medium</TextExternalLink>
          . I joined the{" "}
          <TextExternalLink href="https://medium.com/creators">
            Medium Partner Program
          </TextExternalLink>{" "}
          and moved some of my posts behind the{" "}
          <TextExternalLink href="https://help.medium.com/hc/en-us/articles/360018834314-Stories-that-are-part-of-the-metered-paywall">
            metered paywall
          </TextExternalLink>
          . Time to become a millionaire.
        </Paragraph>
        <Paragraph>
          I quickly wrote a new blogpost and shared it on{" "}
          <TextExternalLink href="https://www.reddit.com/">
            Reddit
          </TextExternalLink>
          . This received some backlash as someone commented "Too bad you care
          about money more than sharing it. ¯\(ツ)/¯". That hurt, but it was
          also kinda true.
        </Paragraph>
        <Paragraph>
          This sparked a thought in my head. I can just create my own blog.
          Maybe add some ads. And still become a millionaire. I can just blog
          about building a blog. Easy does it.
        </Paragraph>
      </Section>
      <Section>
        {posts.map(({ id, slug, title, date, excerptAst }) => (
          <Post
            key={id}
            slug={slug}
            title={title}
            date={date}
            htmlAst={excerptAst}
          />
        ))}
      </Section>
    </Layout>
  );
};
