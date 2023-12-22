import Link from 'next/link';

const IndexPage = (): JSX.Element => (
  <div>
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">About</Link>
    </p>
  </div>
);

export default IndexPage;
