import React, { FC, ReactNode} from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-lightpink">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
