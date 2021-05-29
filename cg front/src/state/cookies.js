import Cookies from 'js-cookie';
import { futureTime } from '../utils';

export const cookiesClear = () => Cookies.remove('token');

/* expires in futureTime(60) 60 minutes */
export const cookiesSet = (name, time = 1440) =>
  Cookies.set('token', name, {
    expires: futureTime(time),
  });

export const cookiesGet = (name = 'token') => Cookies.get(name);

export const cookieCheck = () => !!Cookies.get('token');
