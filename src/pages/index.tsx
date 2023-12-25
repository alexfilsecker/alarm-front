import { Button, Input } from '@mui/material';

const IndexPage = (): JSX.Element => {
  const handleAuth = () => {};
  return (
    <div className="flex justify-center my-10">
      <div className="flex flex-col gap-10 items-center">
        <h1 className="text-5xl">FRONTEND ALARM</h1>
        <div className="flex flex-col gap-5">
          <Input placeholder="Password" type="password" />
          <Button>Authenticate</Button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
