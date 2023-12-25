import { useRouter } from 'next/router';
import { useAppSelector } from '../hooks/state';
import { useEffect } from 'react';

const DashboardPage = (): JSX.Element => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      void router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex justify-center my-10">
      <div className="flex flex-col gap-10 items-center">
        <h1 className="text-5xl">DASHBOARD</h1>
      </div>
    </div>
  );
};

export default DashboardPage;
