[frontity](../README.md) › [Globals](../globals.md) › ["error/src/index"](_error_src_index_.md)

# Module: "error/src/index"

Provides functions to log errors and warnings in Frontity.

## Index

### Interfaces

* [Error](../interfaces/_error_src_index_.error.md)

### Variables

* [suffix](_error_src_index_.md#private-const-suffix)

### Functions

* [error](_error_src_index_.md#const-error)
* [warn](_error_src_index_.md#const-warn)

## Variables

### `Private` `Const` suffix

• **suffix**: *"
Visit https://community.frontity.org for help! 🙂
"* = "
Visit https://community.frontity.org for help! 🙂
"

*Defined in [packages/error/src/index.ts:11](https://github.com/frontity/frontity/blob/eb6bfe49/packages/error/src/index.ts#L11)*

Community message added to [error](_error_src_index_.md#const-error) and [warn](_error_src_index_.md#const-warn).

## Functions

### `Const` error

▸ **error**(`message`: string, `options`: object): *void*

*Defined in [packages/error/src/index.ts:33](https://github.com/frontity/frontity/blob/eb6bfe49/packages/error/src/index.ts#L33)*

Throws an error, but adding a standard Frontity suffix to the message
encouraging users to visit the community for help.

**Parameters:**

▪ **message**: *string*

The error message.

▪`Default value`  **options**: *object*= {}

The options of [error](_error_src_index_.md#const-error).

Name | Type | Description |
------ | ------ | ------ |
`throw?` | boolean | Throws if true, does a console.error if false. |

**Returns:** *void*

___

### `Const` warn

▸ **warn**(`message`: string): *void*

*Defined in [packages/error/src/index.ts:52](https://github.com/frontity/frontity/blob/eb6bfe49/packages/error/src/index.ts#L52)*

Logs a warning in the console adding a standard Frontity suffix to the
message encouraging users to visit the community for help.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | The warning message.  |

**Returns:** *void*
