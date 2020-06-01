[Frontity](../README.md) › [Globals](../globals.md) › [types](../modules/types.md) › [Package](types.package.md)

# Interface: Package

## Hierarchy

* **Package**

  ↳ [Analytics](analytics.analytics-1.md)

## Index

### Properties

* [actions](types.package.md#optional-actions)
* [fills](types.package.md#optional-fills)
* [libraries](types.package.md#optional-libraries)
* [name](types.package.md#optional-name)
* [roots](types.package.md#optional-roots)
* [state](types.package.md#optional-state)

## Properties

### `Optional` actions

• **actions**? : *object*

*Defined in [packages/types/src/package.ts:27](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/package.ts#L27)*

#### Type declaration:

* \[ **namespace**: *string*\]: object

* \[ **action**: *string*\]: function | function

___

### `Optional` fills

• **fills**? : *object*

*Defined in [packages/types/src/package.ts:6](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/package.ts#L6)*

#### Type declaration:

* \[ **namespace**: *string*\]: React.ReactType

___

### `Optional` libraries

• **libraries**? : *object*

*Defined in [packages/types/src/package.ts:70](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/package.ts#L70)*

#### Type declaration:

* \[ **namespace**: *string*\]: object

* \[ **library**: *string*\]: any

___

### `Optional` name

• **name**? : *string*

*Defined in [packages/types/src/package.ts:2](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/package.ts#L2)*

___

### `Optional` roots

• **roots**? : *object*

*Defined in [packages/types/src/package.ts:3](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/package.ts#L3)*

#### Type declaration:

* \[ **namespace**: *string*\]: React.ReactType

___

### `Optional` state

• **state**? : *object*

*Defined in [packages/types/src/package.ts:9](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/package.ts#L9)*

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
