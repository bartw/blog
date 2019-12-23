import React from "react";

export default ({ className, date, formattedDate }) => (
  <time className={`text-sm text-gray-600 ${className}`} dateTime={date}>
    {formattedDate}
  </time>
);
