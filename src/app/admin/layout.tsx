import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <div className="bg-red-500 min-h-screen">{children}</div>;
};

export default layout;
