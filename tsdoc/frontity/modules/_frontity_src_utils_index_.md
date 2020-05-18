[frontity](../README.md) › [Globals](../globals.md) › ["frontity/src/utils/index"](_frontity_src_utils_index_.md)

# Module: "frontity/src/utils/index"

## Index

### Functions

* [errorLogger](_frontity_src_utils_index_.md#const-errorlogger)
* [fetchPackageVersion](_frontity_src_utils_index_.md#const-fetchpackageversion)
* [isFrontityProjectRoot](_frontity_src_utils_index_.md#const-isfrontityprojectroot)
* [isPackageNameValid](_frontity_src_utils_index_.md#const-ispackagenamevalid)
* [isThemeNameValid](_frontity_src_utils_index_.md#const-isthemenamevalid)
* [log](_frontity_src_utils_index_.md#const-log)

## Functions

### `Const` errorLogger

▸ **errorLogger**(`error`: [Error](../interfaces/_error_src_index_.error.md), `message?`: string): *never*

*Defined in [packages/frontity/src/utils/index.ts:19](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/index.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | [Error](../interfaces/_error_src_index_.error.md) |
`message?` | string |

**Returns:** *never*

___

### `Const` fetchPackageVersion

▸ **fetchPackageVersion**(`pkg`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹any›*

*Defined in [packages/frontity/src/utils/index.ts:39](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/index.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`pkg` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹any›*

___

### `Const` isFrontityProjectRoot

▸ **isFrontityProjectRoot**(`path`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹boolean›*

*Defined in [packages/frontity/src/utils/index.ts:32](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/index.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹boolean›*

___

### `Const` isPackageNameValid

▸ **isPackageNameValid**(`name`: string): *boolean*

*Defined in [packages/frontity/src/utils/index.ts:5](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/index.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

### `Const` isThemeNameValid

▸ **isThemeNameValid**(`name`: string): *boolean*

*Defined in [packages/frontity/src/utils/index.ts:14](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/index.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

### `Const` log

▸ **log**(`msg?`: any, ...`optionalParams`: any[]): *void*

*Defined in [packages/frontity/src/utils/index.ts:48](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/index.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`msg?` | any |
`...optionalParams` | any[] |

**Returns:** *void*
