// Default Babel configuration.
import { TransformOptions } from 'babel-core';

const config: TransformOptions = {
  presets: [['env', { useBuiltIns: 'usage' }], 'react'],
  plugins: ['transform-object-rest-spread', 'transform-class-properties'],
};

export default config;
