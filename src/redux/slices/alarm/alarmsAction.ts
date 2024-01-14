import generateRequest from '../../generalActions';

import { type Alarms } from './alarmsSlice';

export const getAlarms = generateRequest<Alarms>('get', 'alarms');
