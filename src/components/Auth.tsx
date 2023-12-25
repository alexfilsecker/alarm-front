import { Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/state';
import { useRouter } from 'next/router';
import login from '../redux/slices/auth/authActions';

const Auth = (): JSX.Element => {
  const [password, setPassword] = useState('');

  const { isAuthenticated, loadingAuth, authErrorMessage } = useAppSelector(
    (state) => state.auth,
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      void router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  const handleAuth = (): void => {
    if (!loadingAuth) {
      void dispatch(login({ password }));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <TextField
        error={authErrorMessage !== null}
        variant="standard"
        placeholder="Password"
        type="password"
        value={password}
        onChange={handlePassChange}
        onKeyDown={handleKeyDown}
        helperText={authErrorMessage}
      />
      {loadingAuth ? (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <Button onClick={handleAuth}>Login</Button>
      )}
    </div>
  );
};

export default Auth;
