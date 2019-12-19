import React from "react";

export default ({ to, className, children }) => (
  <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);
