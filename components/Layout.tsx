import Link from 'next/link';
import Head from 'next/head';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = 'This is the default title',
}: Props): JSX.Element => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
        <Link href="/users">Users List</Link> |{' '}
        <Link href="/api/users">Users API</Link>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I`&apos;`m here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
