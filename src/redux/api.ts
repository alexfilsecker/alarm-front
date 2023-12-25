import axios from 'axios';
import type { AxiosResponse } from 'axios';

const post = async <A, RT>(
  path: string,
  body: A,
): Promise<AxiosResponse<RT, any>> => {
  return await axios<RT>({
    method: 'POST',
    url: path,
    data: body,
  });
};

export default post;
