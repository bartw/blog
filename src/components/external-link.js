import React from "react";

export default ({ href, className, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);
