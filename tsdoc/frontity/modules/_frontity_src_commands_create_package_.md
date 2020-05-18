[frontity](../README.md) › [Globals](../globals.md) › ["frontity/src/commands/create-package"](_frontity_src_commands_create_package_.md)

# Module: "frontity/src/commands/create-package"

## Index

### Type aliases

* [EventTypes](_frontity_src_commands_create_package_.md#eventtypes)

### Functions

* [createPackage](_frontity_src_commands_create_package_.md#const-createpackage)

## Type aliases

###  EventTypes

Ƭ **EventTypes**: *"error" | "message"*

*Defined in [packages/frontity/src/commands/create-package.ts:62](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/commands/create-package.ts#L62)*

## Functions

### `Const` createPackage

▸ **createPackage**(`options`: [Options](_frontity_src_steps_create_package_.md#options), `emit`: function, `reject`: function): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/commands/create-package.ts:14](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/commands/create-package.ts#L14)*

**Parameters:**

▪ **options**: *[Options](_frontity_src_steps_create_package_.md#options)*

▪ **emit**: *function*

▸ (`event`: string, ...`value`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`...value` | any[] |

▪ **reject**: *function*

▸ (`reason`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`reason` | any |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*
