[Frontity](../README.md) › [Globals](../globals.md) › [source](../modules/source.md) › [ServerError](source.servererror.md)

# Class: ServerError

## Hierarchy

* [Error](source.servererror.md#static-error)

  ↳ **ServerError**

## Index

### Constructors

* [constructor](source.servererror.md#constructor)

### Properties

* [message](source.servererror.md#message)
* [name](source.servererror.md#name)
* [stack](source.servererror.md#optional-stack)
* [status](source.servererror.md#status)
* [statusText](source.servererror.md#statustext)
* [Error](source.servererror.md#static-error)

## Constructors

###  constructor

\+ **new ServerError**(`message`: string, `status`: number, `statusText`: string): *[ServerError](source.servererror.md)*

*Defined in [packages/source/src/server-error.ts:5](https://github.com/frontity/frontity/blob/8f93b4e4/packages/source/src/server-error.ts#L5)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`message` | string | "" |
`status` | number | - |
`statusText` | string | message |

**Returns:** *[ServerError](source.servererror.md)*

## Properties

###  message

• **message**: *string*

*Inherited from [ServerError](source.servererror.md).[message](source.servererror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string* = "ServerError"

*Overrides void*

*Defined in [packages/source/src/server-error.ts:2](https://github.com/frontity/frontity/blob/8f93b4e4/packages/source/src/server-error.ts#L2)*

___

### `Optional` stack

• **stack**? : *string*

*Inherited from [ServerError](source.servererror.md).[stack](source.servererror.md#optional-stack)*

*Overrides [ServerError](source.servererror.md).[stack](source.servererror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

###  status

• **status**: *number*

*Defined in [packages/source/src/server-error.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/source/src/server-error.ts#L4)*

___

###  statusText

• **statusText**: *string*

*Defined in [packages/source/src/server-error.ts:5](https://github.com/frontity/frontity/blob/8f93b4e4/packages/source/src/server-error.ts#L5)*

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
