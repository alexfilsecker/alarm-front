import generateRequest from '../../generalActions';

type LoginBody = {
  password: string;
};

export const login = generateRequest<string, LoginBody>('post', 'auth/login');

export default login;
