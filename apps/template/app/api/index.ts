import * as auth from './modules/auth/index';

export const api = {
  auth,
};

export type Api = typeof api;
