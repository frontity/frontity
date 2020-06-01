[Frontity](../README.md) › [Globals](../globals.md) › [error](error.md)

# Package: error

# `@frontity/error`

The Frontity warnings and errors.

They are just wrappers for `console.warn` and `console.error`

## Usage

```js
import { warn, error } from "@frontity/error";
```

## Index

### Functions

* [error](error.md#const-error)
* [warn](error.md#const-warn)

## Functions

### `Const` error

▸ **error**(`message`: string, `options`: object): *void*

*Defined in [packages/error/src/index.ts:12](https://github.com/frontity/frontity/blob/8f93b4e4/packages/error/src/index.ts#L12)*

**Parameters:**

▪ **message**: *string*

▪`Default value`  **options**: *object*= {}

Name | Type |
------ | ------ |
`throw?` | boolean |

**Returns:** *void*

___

### `Const` warn

▸ **warn**(`message`: string): *void*

*Defined in [packages/error/src/index.ts:23](https://github.com/frontity/frontity/blob/8f93b4e4/packages/error/src/index.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*
