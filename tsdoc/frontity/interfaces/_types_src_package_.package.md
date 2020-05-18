[frontity](../README.md) › [Globals](../globals.md) › ["types/src/package"](../modules/_types_src_package_.md) › [Package](_types_src_package_.package.md)

# Interface: Package

## Hierarchy

* **Package**

## Index

### Properties

* [actions](_types_src_package_.package.md#optional-actions)
* [fills](_types_src_package_.package.md#optional-fills)
* [libraries](_types_src_package_.package.md#optional-libraries)
* [name](_types_src_package_.package.md#optional-name)
* [roots](_types_src_package_.package.md#optional-roots)
* [state](_types_src_package_.package.md#optional-state)

## Properties

### `Optional` actions

• **actions**? : *object*

*Defined in [packages/types/src/package.ts:27](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/package.ts#L27)*

#### Type declaration:

* \[ **namespace**: *string*\]: object

* \[ **action**: *string*\]: function | function

___

### `Optional` fills

• **fills**? : *object*

*Defined in [packages/types/src/package.ts:6](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/package.ts#L6)*

#### Type declaration:

* \[ **namespace**: *string*\]: React.ReactType

___

### `Optional` libraries

• **libraries**? : *object*

*Defined in [packages/types/src/package.ts:70](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/package.ts#L70)*

#### Type declaration:

* \[ **namespace**: *string*\]: object

* \[ **library**: *string*\]: any

___

### `Optional` name

• **name**? : *string*

*Defined in [packages/types/src/package.ts:2](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/package.ts#L2)*

___

### `Optional` roots

• **roots**? : *object*

*Defined in [packages/types/src/package.ts:3](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/package.ts#L3)*

#### Type declaration:

* \[ **namespace**: *string*\]: React.ReactType

___

### `Optional` state

• **state**? : *object*

*Defined in [packages/types/src/package.ts:9](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/package.ts#L9)*

#### Type declaration:

* \[ **namespace**: *string*\]: object

* \[ **key**: *string*\]: any

* **frontity**(): *object*

  * **description**? : *string*

  * **initialLink**? : *string*

  * **mode**? : *string*

  * **name**? : *string*

  * **packages**? : *string[]*

  * **platform**? : *"client" | "server"*

  * **rendering**? : *"ssr" | "csr"*

  * **title**? : *string*

  * **url**? : *string*
