// Browsers supporting Proxy (needed by Overmind).
import { TransformOptions } from 'babel-core';

export default (config: TransformOptions) => {
  const env = config.presets.find(preset => preset[0] === 'env');
  env[1].targets = {
    browsers: [
      'and_chr >= 67',
      'and_ff >= 18',
      'and_uc >= 11.8',
      'android >= 67',
      'not android <= 4.4.4',
      'chrome >= 49',
      'edge >= 12',
      'firefox >= 18',
      'ios_saf >= 10',
      'not op_mini all',
      'op_mob >= 46',
      'opera >= 36',
      'safari >= 10',
      'samsung >= 5',
    ],
  };
  return config;
};
