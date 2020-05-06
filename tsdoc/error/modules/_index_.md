[@frontity/error](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

Provides functions to log errors and warnings in Frontity.

## Index

### Interfaces

* [Error](../interfaces/_index_.error.md)

### Variables

* [suffix](_index_.md#private-const-suffix)

### Functions

* [error](_index_.md#const-error)
* [warn](_index_.md#const-warn)

## Variables

### `Private` `Const` suffix

• **suffix**: *"
Visit https://community.frontity.org for help! 🙂
"* = "
Visit https://community.frontity.org for help! 🙂
"

Defined in index.ts:11

Community message added to [error](_index_.md#const-error) and [warn](_index_.md#const-warn).

## Functions

### `Const` error

▸ **error**(`message`: string, `options`: object): *void*

Defined in index.ts:33

Throws an error, but adding a standard Frontity suffix to the message
encouraging users to visit the community for help.

**Parameters:**

▪ **message**: *string*

The error message.

▪`Default value`  **options**: *object*= {}

The options of [error](_index_.md#const-error).

Name | Type | Description |
------ | ------ | ------ |
`throw?` | boolean | Throws if true, does a console.error if false. |

**Returns:** *void*

___

### `Const` warn

▸ **warn**(`message`: string): *void*

Defined in index.ts:52

Logs a warning in the console adding a standard Frontity suffix to the
message encouraging users to visit the community for help.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | The warning message.  |

**Returns:** *void*
