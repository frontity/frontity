import FrontityConfig from '.';

const config = (config: FrontityConfig) => {
  config.staticHeaders['Cache-Control'] =
    'public, max-age=31536000, s-maxage=31536000, immutable';
  config.dynamicHeaders['Cache-Control'] =
    'public, max-age=0, s-maxage=120, stale-while-revalidate=31536000, stale-if-error=31536000';
};

export default config;
