import generateRequest from '../../generalActions';

type LoginBody = {
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
  refreshToken: string;
};

export const login = generateRequest<LoginResponse, LoginBody>(
  'post',
  'auth/login',
  { withToken: false },
);

export default login;
