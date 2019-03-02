import { TransformOptions } from 'babel-core';

export type Mode = 'development' | 'production';
export type Env = 'module' | 'es5' | 'node';

export interface BabelConfig {
  module: TransformOptions;
  es5: TransformOptions;
  node: TransformOptions;
}
