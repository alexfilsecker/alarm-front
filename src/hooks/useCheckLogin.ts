import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from './state';

const useCheckLogin = (): void => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (userInfo === null) {
      void router.push('/');
    }
  }, [userInfo, router]);
};

export default useCheckLogin;
