import Auth from "../components/Auth";

const IndexPage = (): React.ReactNode => {
  return (
    <div className="flex justify-center my-10">
      <div className="flex flex-col gap-10 items-center">
        <h1 className="text-5xl">FRONTEND ALARM</h1>
        <Auth />
      </div>
    </div>
  );
};

export default IndexPage;
