import FrontityConfig from '.';

const defaultConfig: FrontityConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Origin, X-Requested-With, Content-Type': 'Accept',
  },
  staticHeaders: {},
  dynamicHeaders: {},
  robots: 'User-agent: *\nDisallow:',
};

export default defaultConfig;
