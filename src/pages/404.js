import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import Paragraph from "../components/paragraph";
import ExternalLink from "../components/external-link";
import Posts from "../components/posts";

export default () => (
  <Layout>
    <Section>
      <ExternalLink href="https://en.wikipedia.org/wiki/HTTP_404">
        <h1 className="font-bold">404</h1>
      </ExternalLink>
      <Paragraph>This page could not be found.</Paragraph>
    </Section>
    <Section>
      <Paragraph>Check out one of my posts instead:</Paragraph>
      <Posts />
    </Section>
  </Layout>
);
