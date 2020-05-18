[frontity](../README.md) › [Globals](../globals.md) › ["frontity/src/commands/create"](_frontity_src_commands_create_.md)

# Module: "frontity/src/commands/create"

## Index

### Type aliases

* [EventTypes](_frontity_src_commands_create_.md#eventtypes)

### Functions

* [create](_frontity_src_commands_create_.md#const-create)

### Object literals

* [defaultOptions](_frontity_src_commands_create_.md#const-defaultoptions)

## Type aliases

###  EventTypes

Ƭ **EventTypes**: *"error" | "message" | "subscribe"*

*Defined in [packages/frontity/src/commands/create.ts:93](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/commands/create.ts#L93)*

## Functions

### `Const` create

▸ **create**(`passedOptions`: [Options](_frontity_src_steps_create_package_.md#options), `emit`: function, `reject`: function): *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

*Defined in [packages/frontity/src/commands/create.ts:25](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/commands/create.ts#L25)*

**Parameters:**

▪ **passedOptions**: *[Options](_frontity_src_steps_create_package_.md#options)*

▪ **emit**: *function*

▸ (`evtType`: [EventTypes](_frontity_src_commands_create_.md#eventtypes), ...`value`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`evtType` | [EventTypes](_frontity_src_commands_create_.md#eventtypes) |
`...value` | any[] |

▪ **reject**: *function*

▸ (`reason`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`reason` | any |

**Returns:** *[Promise](../classes/_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹void›*

## Object literals

### `Const` defaultOptions

### ▪ **defaultOptions**: *object*

*Defined in [packages/frontity/src/commands/create.ts:16](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/commands/create.ts#L16)*

###  packages

• **packages**: *undefined[]* = [
    // "@frontity/wp-source"
  ]

*Defined in [packages/frontity/src/commands/create.ts:19](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/commands/create.ts#L19)*

###  path

• **path**: *string* = process.cwd()

*Defined in [packages/frontity/src/commands/create.ts:17](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/commands/create.ts#L17)*

###  theme

• **theme**: *string* = "@frontity/mars-theme"

*Defined in [packages/frontity/src/commands/create.ts:22](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/commands/create.ts#L22)*

###  typescript

• **typescript**: *false* = false

*Defined in [packages/frontity/src/commands/create.ts:18](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/commands/create.ts#L18)*
