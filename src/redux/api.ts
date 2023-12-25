import axios from 'axios';
import type { AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const post = async <A, RT>(
  path: string,
  body: A,
): Promise<AxiosResponse<RT, any>> => {
  const url = `${baseURL}/${path}`;
  return await axios<RT>({
    method: 'POST',
    url,
    data: body,
  });
};

export default post;
