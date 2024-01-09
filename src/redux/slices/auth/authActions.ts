import generateRequest from '../../generalActions';

type LoginBody = {
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
