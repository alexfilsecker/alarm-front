import generateRequest from '../../generalActions';

type LoginBody = {
  password: string;
};

type LoginResponse = {
  token: string;
};

export const login = generateRequest<LoginResponse, LoginBody>(
  'post',
  'auth/login',
);

export default login;
