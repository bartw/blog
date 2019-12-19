import React from "react";
import Layout from "../components/layout";
import { usePosts } from "../hooks/use-posts";
import { Link } from "gatsby";

export default () => {
  const posts = usePosts();
  return (
    <Layout>
      <section className="bg-yellow-500 text-black p-10">
        <p>
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
      </section>
      <section className="bg-white text-black p-10">
        {posts.map(({ id, slug, title, date, excerpt }) => (
          <article key={id}>
            <header>
              <Link to={slug}>
                <h1>{title}</h1>
              </Link>
              <time dateTime={date}>{date}</time>
            </header>
            <div dangerouslySetInnerHTML={{ __html: excerpt }} />
          </article>
        ))}
      </section>
    </Layout>
  );
};
