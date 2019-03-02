import FrontityConfig from '.';

const config = (config: FrontityConfig) => {
  config.staticHeaders['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  config.dynamicHeaders['Cache-Control'] =
    'no-cache, no-store, must-revalidate';
};

export default config;
