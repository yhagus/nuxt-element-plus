import * as auth from './modules/auth/index';
import * as user from './modules/user/index';

export const api = {
  auth,
  user,
};

export type Api = typeof api;
