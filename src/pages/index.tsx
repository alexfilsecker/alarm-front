import Auth from '../components/Auth';

const IndexPage = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-10 items-center">
      <h1 className="text-5xl">FRONTEND ALARM</h1>
      <Auth />
    </div>
  );
};

export default IndexPage;
