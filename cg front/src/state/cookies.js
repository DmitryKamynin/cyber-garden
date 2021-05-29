import Cookies from 'js-cookie';
import { futureTime } from '../config';

export const cookiesClear = () => Cookies.remove('token_app');

/* expires in futureTime(60) 60 minutes */
export const cookiesSet = (name, time = 3600) =>
  Cookies.set('token', name, {
    expires: futureTime(time),
  });

export const cookiesGet = (name = 'token') => Cookies.get(name);

export const cookieCheck = () => !!Cookies.get('token');
