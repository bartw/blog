import React from "react";
import rehypeReact from "rehype-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import Paragraph from "./paragraph";
import ExternalLink from "./external-link";
import TextExternalLink from "./text-external-link";
import Title from "./title";
import Subtitle from "./subtitle";
import Time from "./time";
import PostLayout from "./post-layout";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { p: Paragraph, a: TextExternalLink, h2: Subtitle }
}).Compiler;

export default ({ date, formattedDate, title, repo, htmlAst }) => (
  <PostLayout
    header={
      <>
        <div>
          <Time
            className="inline-block mr-2"
            date={date}
            formattedDate={formattedDate}
          />
          {repo && (
            <ExternalLink
              className="inline-block text-sm text-gray-600"
              href={repo}
              ariaLabel="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </ExternalLink>
          )}
        </div>
        <Title>{title}</Title>
      </>
    }
    content={renderAst(htmlAst)}
    footer={
      repo && (
        <ExternalLink href={`${repo}/issues`}>
          <FontAwesomeIcon icon={faComments} />
          <span className="ml-2">
            Typos, problems or comments? Click here to connect using GitHub
            issues.
          </span>
        </ExternalLink>
      )
    }
  />
);
