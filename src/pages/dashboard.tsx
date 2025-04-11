import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../hooks/state";
import peneAction from "../redux/slices/pene/peneActions";

const DashboardPage = (): React.ReactNode => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    void dispatch(peneAction());
  };

  useEffect(() => {
    if (userInfo === null) {
      void router.push("/");
    }
  }, [userInfo, router]);

  return (
    <div className="flex justify-center my-10">
      <div className="flex flex-col gap-10 items-center">
        <h1 className="text-5xl">DASHBOARD</h1>
        <Button onClick={handleClick}>dispatch</Button>
      </div>
    </div>
  );
};

export default DashboardPage;
