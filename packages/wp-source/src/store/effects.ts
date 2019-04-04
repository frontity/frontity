import { IsMatch, Exec } from './types';

export const api = {
  get: () => {}
};

export const isMatch: IsMatch = (name, pattern) => { return true };
export const exec: Exec = (name, pattern) => ({ key: "value" });
