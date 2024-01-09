import generateRequest from '../../generalActions';

export const peneAction = generateRequest('post', 'pene', { withToken: true });

export default peneAction;
