[frontity](../README.md) › [Globals](../globals.md) › ["frontity/src/steps/index"](_frontity_src_steps_index_.md)

# Module: "frontity/src/steps/index"

## Index

### Variables

* [allowedExistingContent](_frontity_src_steps_index_.md#const-allowedexistingcontent)
* [faviconUrl](_frontity_src_steps_index_.md#const-faviconurl)

### Functions

* [cloneStarterTheme](_frontity_src_steps_index_.md#const-clonestartertheme)
* [createFrontitySettings](_frontity_src_steps_index_.md#const-createfrontitysettings)
* [createPackageJson](_frontity_src_steps_index_.md#const-createpackagejson)
* [createReadme](_frontity_src_steps_index_.md#const-createreadme)
* [downloadFavicon](_frontity_src_steps_index_.md#const-downloadfavicon)
* [ensureProjectDir](_frontity_src_steps_index_.md#const-ensureprojectdir)
* [installDependencies](_frontity_src_steps_index_.md#const-installdependencies)
* [isEmailValid](_frontity_src_steps_index_.md#const-isemailvalid)
* [normalizeOptions](_frontity_src_steps_index_.md#const-normalizeoptions)
* [revertProgress](_frontity_src_steps_index_.md#const-revertprogress)
* [subscribe](_frontity_src_steps_index_.md#const-subscribe)

## Variables

### `Const` allowedExistingContent

• **allowedExistingContent**: *string[]* = ["readme.md", "license", ".git", ".gitignore"]

*Defined in [packages/frontity/src/steps/index.ts:25](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L25)*

___

### `Const` faviconUrl

• **faviconUrl**: *"https://favicon.frontity.org/"* = "https://favicon.frontity.org/"

*Defined in [packages/frontity/src/steps/index.ts:26](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L26)*

## Functions

### `Const` cloneStarterTheme

▸ **cloneStarterTheme**(`theme`: string, `path`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:194](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L194)*

**Parameters:**

Name | Type |
------ | ------ |
`theme` | string |
`path` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

___

### `Const` createFrontitySettings

▸ **createFrontitySettings**(`extension`: string, `name`: string, `path`: string, `theme`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:136](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`extension` | string |
`name` | string |
`path` | string |
`theme` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

___

### `Const` createPackageJson

▸ **createPackageJson**(`name`: string, `theme`: string, `path`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:69](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`theme` | string |
`path` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

___

### `Const` createReadme

▸ **createReadme**(`name`: string, `path`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:120](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`path` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

___

### `Const` downloadFavicon

▸ **downloadFavicon**(`path`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:218](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L218)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

___

### `Const` ensureProjectDir

▸ **ensureProjectDir**(`path`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹boolean›*

*Defined in [packages/frontity/src/steps/index.ts:48](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹boolean›*

___

### `Const` installDependencies

▸ **installDependencies**(`path`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:213](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

___

### `Const` isEmailValid

▸ **isEmailValid**(`email`: string): *boolean*

*Defined in [packages/frontity/src/steps/index.ts:239](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L239)*

**Parameters:**

Name | Type |
------ | ------ |
`email` | string |

**Returns:** *boolean*

___

### `Const` normalizeOptions

▸ **normalizeOptions**(`defaultOptions`: [Options](_frontity_src_steps_create_package_.md#options), `passedOptions`: [Options](_frontity_src_steps_create_package_.md#options)): *[Options](_frontity_src_steps_create_package_.md#options)*

*Defined in [packages/frontity/src/steps/index.ts:29](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`defaultOptions` | [Options](_frontity_src_steps_create_package_.md#options) |
`passedOptions` | [Options](_frontity_src_steps_create_package_.md#options) |

**Returns:** *[Options](_frontity_src_steps_create_package_.md#options)*

___

### `Const` revertProgress

▸ **revertProgress**(`dirExisted`: boolean, `path`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/index.ts:227](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L227)*

**Parameters:**

Name | Type |
------ | ------ |
`dirExisted` | boolean |
`path` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

___

### `Const` subscribe

▸ **subscribe**(`email`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹Response‹››*

*Defined in [packages/frontity/src/steps/index.ts:242](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/index.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`email` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹Response‹››*
