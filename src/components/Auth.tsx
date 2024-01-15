import { Button, CircularProgress, Paper, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/state';
import login from '../redux/slices/auth/authActions';

const Auth = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { userInfo, loadingAuth, authErrorMessage } = useAppSelector(
    (state) => state.auth,
  );

  const router = useRouter();

  useEffect(() => {
    if (userInfo !== null) {
      void router.push('/dashboard');
    }
  }, [userInfo, router]);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  const dispatch = useAppDispatch();
  const handleAuth = (): void => {
    if (!loadingAuth && password.length > 0) {
      void dispatch(login({ password, username }));
    }
  };

  return (
    <Paper className="flex flex-col gap-5 p-5">
      <TextField
        variant="standard"
        placeholder="Username"
        value={username}
        error={authErrorMessage?.errorIn === 'username'}
        onChange={handleUserChange}
        helperText={
          authErrorMessage?.errorIn === 'username' && authErrorMessage?.message
        }
      />
      <TextField
        error={authErrorMessage !== null}
        variant="standard"
        placeholder="Password"
        type="password"
        value={password}
        onChange={handlePassChange}
        onKeyDown={handleKeyDown}
        helperText={
          authErrorMessage?.errorIn === 'password' && authErrorMessage?.message
        }
      />
      {loadingAuth ? (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <Button onClick={handleAuth} disabled={password.length === 0}>
          Login
        </Button>
      )}
    </Paper>
  );
};

export default Auth;
