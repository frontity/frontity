import { TransformOptions } from 'babel-core';
import defaultConfig from './babel.default';
import moduleDev from './babel.module.dev';
import moduleProd from './babel.module.prod';
import es5 from './babel.es5';
import node from './babel.node';

type Env = 'moduleDev' | 'moduleProd' | 'es5' | 'node';

const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export default (env: Env): TransformOptions => {
  switch (env) {
    case 'moduleDev':
      return moduleDev(clone(defaultConfig));
    case 'moduleProd':
      return moduleProd(clone(defaultConfig));
    case 'es5':
      return es5(clone(defaultConfig));
    case 'node':
      return node(clone(defaultConfig));
  }
};
