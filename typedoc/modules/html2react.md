[Frontity](../README.md) › [Globals](../globals.md) › [html2react](html2react.md)

# Package: html2react

## Index

### Interfaces

* [AdaptNode](../interfaces/html2react.adaptnode.md)
* [ApplyProcessors](../interfaces/html2react.applyprocessors.md)
* [Attributes](../interfaces/html2react.attributes.md)
* [Comment](../interfaces/html2react.comment.md)
* [Element](../interfaces/html2react.element.md)
* [HandleNode](../interfaces/html2react.handlenode.md)
* [HandleNodes](../interfaces/html2react.handlenodes.md)
* [Parse](../interfaces/html2react.parse.md)
* [Processor](../interfaces/html2react.processor.md)
* [Text](../interfaces/html2react.text.md)

### Type aliases

* [Component](html2react.md#component)
* [Node](html2react.md#node)

### Functions

* [Html2React](html2react.md#const-html2react)

## Type aliases

###  Component

Ƭ **Component**: *React.FC‹T›*

*Defined in [packages/html2react/types.ts:116](https://github.com/frontity/frontity/blob/8f93b4e4/packages/html2react/types.ts#L116)*

___

###  Node

Ƭ **Node**: *[Element](../interfaces/html2react.element.md) | [Text](../interfaces/html2react.text.md) | [Comment](../interfaces/html2react.comment.md)*

*Defined in [packages/html2react/types.ts:43](https://github.com/frontity/frontity/blob/8f93b4e4/packages/html2react/types.ts#L43)*

## Functions

### `Const` Html2React

▸ **Html2React**(`__namedParameters`: object): *ReactElement‹any, string | function | object›*

*Defined in [packages/html2react/src/libraries/component.tsx:106](https://github.com/frontity/frontity/blob/8f93b4e4/packages/html2react/src/libraries/component.tsx#L106)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`html` | string |
`libraries` | object |
`state` | object |

**Returns:** *ReactElement‹any, string | function | object›*
