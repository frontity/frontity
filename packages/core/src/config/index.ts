import { TransformOptions } from 'babel-core';
import { Configuration } from 'webpack';
import { Mode } from './types';

export interface Headers {
  [key: string]: string;
}

export type Robots = string;

export interface FrontityConfig {
  headers: {
    static: Headers;
    dynamic: Headers;
  };
  robots: Robots;
  babel: {
    module: TransformOptions;
    es5: TransformOptions;
    node: TransformOptions;
  };
  webpack: {
    module: Configuration;
    es5: Configuration;
    node: Configuration;
  };
}

export default ({ mode }: { mode: Mode }) => {};
