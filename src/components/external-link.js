import React from "react";

export default ({ href, className, ariaLabel, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    aria-label={ariaLabel}
  >
    {children}
  </a>
);
