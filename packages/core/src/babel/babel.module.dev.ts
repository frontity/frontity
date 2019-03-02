// Modern browsers with esModules support (with HMR).
import { TransformOptions } from 'babel-core';

export default (config: TransformOptions) => {
  const env = config.presets.find(preset => preset[0] === 'env');
  env[1] = { ...env[1], targets: { esmodules: true } };
  config.plugins.push('react-hot-loader/babel');
  return config;
};
