[Frontity](../README.md) › [Globals](../globals.md) › [core](core.md)

# Package: core

# `core`

> TODO: description

## Usage

```
const core = require('core');

// TODO: DEMONSTRATE API
```

## Index

### References

* [build](core.md#build)
* [dev](core.md#dev)
* [serve](core.md#serve)

### Interfaces

* [BabelConfigs](../interfaces/core.babelconfigs.md)
* [Config](../interfaces/core.config.md)
* [EntryPoints](../interfaces/core.entrypoints.md)
* [Extractor](../interfaces/core.extractor.md)
* [FrontityConfig](../interfaces/core.frontityconfig.md)
* [Stats](../interfaces/core.stats.md)
* [WebpackConfigs](../interfaces/core.webpackconfigs.md)

### Type aliases

* [FrontityTags](core.md#frontitytags)
* [HeadTags](core.md#headtags)
* [Mode](core.md#mode)
* [Target](core.md#target)
* [Template](core.md#template)

### Functions

* [checkForPackages](core.md#const-checkforpackages)
* [entryPoint](core.md#const-entrypoint)
* [generateClientEntryPoints](core.md#const-generatecliententrypoints)
* [generateServerEntryPoint](core.md#const-generateserverentrypoint)
* [getBothScriptTags](core.md#const-getbothscripttags)
* [getStats](core.md#const-getstats)
* [hasEntryPoint](core.md#const-hasentrypoint)
* [webpackAsync](core.md#const-webpackasync)

## References

###  build

• **build**:

___

###  dev

• **dev**:

___

###  serve

• **serve**:

## Type aliases

###  FrontityTags

Ƭ **FrontityTags**: *object*

*Defined in [packages/core/types.ts:34](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/types.ts#L34)*

#### Type declaration:

* **link**? : *string*

* **script**? : *string*

* **style**? : *string*

___

###  HeadTags

Ƭ **HeadTags**: *object*

*Defined in [packages/core/types.ts:40](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/types.ts#L40)*

#### Type declaration:

* **base**: *string*

* **bodyAttributes**: *string*

* **htmlAttributes**: *string*

* **link**: *string*

* **meta**: *string*

* **noscript**: *string*

* **script**: *string*

* **style**: *string*

* **title**: *string*

___

###  Mode

Ƭ **Mode**: *"development" | "production"*

*Defined in [packages/core/types.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/types.ts#L4)*

___

###  Target

Ƭ **Target**: *"module" | "es5" | "server"*

*Defined in [packages/core/types.ts:5](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/types.ts#L5)*

___

###  Template

Ƭ **Template**: *function*

*Defined in [packages/core/types.ts:52](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/types.ts#L52)*

#### Type declaration:

▸ (`__namedParameters`: object): *string*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`frontity` | object |
`head` | object |
`html` | string |

## Functions

### `Const` checkForPackages

▸ **checkForPackages**(`__namedParameters`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/core/src/scripts/utils/entry-points.ts:64](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/src/scripts/utils/entry-points.ts#L64)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`sites` | object[] |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` entryPoint

▸ **entryPoint**(`__namedParameters`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹string›*

*Defined in [packages/core/src/scripts/utils/entry-points.ts:17](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/src/scripts/utils/entry-points.ts#L17)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`mode` | string |
`name` | string |
`type` | "client" &#124; "server" &#124; "inline" |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹string›*

___

### `Const` generateClientEntryPoints

▸ **generateClientEntryPoints**(`__namedParameters`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹[EntryPoints](../interfaces/core.entrypoints.md)[]›*

*Defined in [packages/core/src/scripts/utils/entry-points.ts:184](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/src/scripts/utils/entry-points.ts#L184)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`mode` | "development" &#124; "production" |
`outDir` | string |
`sites` | object[] |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹[EntryPoints](../interfaces/core.entrypoints.md)[]›*

___

### `Const` generateServerEntryPoint

▸ **generateServerEntryPoint**(`__namedParameters`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹[EntryPoints](../interfaces/core.entrypoints.md)›*

*Defined in [packages/core/src/scripts/utils/entry-points.ts:168](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/src/scripts/utils/entry-points.ts#L168)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`outDir` | string |
`sites` | object[] |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹[EntryPoints](../interfaces/core.entrypoints.md)›*

___

### `Const` getBothScriptTags

▸ **getBothScriptTags**(`__namedParameters`: object): *string*

*Defined in [packages/core/src/server/utils/stats.ts:37](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/src/server/utils/stats.ts#L37)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`es5Stats` | [Stats](../interfaces/core.stats.md) |
`extractor` | [Extractor](../interfaces/core.extractor.md) |
`moduleStats` | [Stats](../interfaces/core.stats.md) |

**Returns:** *string*

___

### `Const` getStats

▸ **getStats**(`__namedParameters`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹[Stats](../interfaces/core.stats.md) | false›*

*Defined in [packages/core/src/server/utils/stats.ts:12](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/src/server/utils/stats.ts#L12)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`target` | "module" &#124; "es5" |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹[Stats](../interfaces/core.stats.md) | false›*

___

### `Const` hasEntryPoint

▸ **hasEntryPoint**(`__namedParameters`: object): *boolean*

*Defined in [packages/core/src/server/utils/stats.ts:27](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/src/server/utils/stats.ts#L27)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`site` | string |
`stats` | [Stats](../interfaces/core.stats.md) |

**Returns:** *boolean*

___

### `Const` webpackAsync

▸ **webpackAsync**(`config`: Configuration): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹Compiler›*

*Defined in [packages/core/src/scripts/utils/webpack.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/core/src/scripts/utils/webpack.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | Configuration |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹Compiler›*
