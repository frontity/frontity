// Transpilation for Node supporting AWS Lambdas.
import { TransformOptions } from 'babel-core';

export default (config: TransformOptions) => {
  const env = config.presets.find(preset => preset[0] === 'env');
  env[1].targets = { node: '8.10' };
  return config;
};
