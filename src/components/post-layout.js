import React from "react";

export default ({ header, content, footer }) => (
  <article className="mt-8">
    <header>{header}</header>
    <div className="mt-1">{content}</div>
    <footer className="mt-1 text-sm text-gray-600">{footer}</footer>
  </article>
);
