import { type ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps): ReactNode => {
  return <div className="flex justify-center m-10">{children}</div>;
};

export default Layout;
