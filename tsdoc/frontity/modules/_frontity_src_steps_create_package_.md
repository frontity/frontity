[frontity](../README.md) › [Globals](../globals.md) › ["frontity/src/steps/create-package"](_frontity_src_steps_create_package_.md)

# Module: "frontity/src/steps/create-package"

## Index

### Type aliases

* [Options](_frontity_src_steps_create_package_.md#options)

### Functions

* [createPackageJson](_frontity_src_steps_create_package_.md#const-createpackagejson)
* [createSrcIndexJs](_frontity_src_steps_create_package_.md#const-createsrcindexjs)
* [installPackage](_frontity_src_steps_create_package_.md#const-installpackage)

## Type aliases

###  Options

Ƭ **Options**: *object*

*Defined in [packages/frontity/src/steps/create-package.ts:9](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/create-package.ts#L9)*

#### Type declaration:

* **name**? : *string*

* **namespace**? : *string*

* **packagePath**? : *string*

* **projectPath**? : *string*

## Functions

### `Const` createPackageJson

▸ **createPackageJson**(`name`: string, `namespace`: string, `projectPath`: string, `packagePath`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/create-package.ts:21](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/create-package.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`namespace` | string |
`projectPath` | string |
`packagePath` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

___

### `Const` createSrcIndexJs

▸ **createSrcIndexJs**(`name`: string, `namespace`: string, `projectPath`: string, `packagePath`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/create-package.ts:48](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/create-package.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`namespace` | string |
`projectPath` | string |
`packagePath` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

___

### `Const` installPackage

▸ **installPackage**(`projectPath`: string, `packagePath`: string): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/steps/create-package.ts:83](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/steps/create-package.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`projectPath` | string |
`packagePath` | string |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*
