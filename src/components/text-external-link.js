import React from "react";
import ExtralLink from "./external-link";

export default ({ href, className, children }) => (
  <ExtralLink href={href} className={`underline font-medium ${className}`}>
    {children}
  </ExtralLink>
);
