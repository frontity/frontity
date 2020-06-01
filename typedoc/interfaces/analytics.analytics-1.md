[Frontity](../README.md) › [Globals](../globals.md) › [analytics](../modules/analytics.md) › [Analytics](analytics.analytics-1.md)

# Interface: Analytics

## Hierarchy

* [Package](types.package.md)

  ↳ **Analytics**

## Index

### Properties

* [actions](analytics.analytics-1.md#actions)
* [fills](analytics.analytics-1.md#optional-fills)
* [libraries](analytics.analytics-1.md#optional-libraries)
* [name](analytics.analytics-1.md#optional-name)
* [roots](analytics.analytics-1.md#roots)
* [state](analytics.analytics-1.md#state)

## Properties

###  actions

• **actions**: *object*

*Overrides [Package](types.package.md).[actions](types.package.md#optional-actions)*

*Defined in [packages/analytics/types.ts:34](https://github.com/frontity/frontity/blob/8f93b4e4/packages/analytics/types.ts#L34)*

Actions.

#### Type declaration:

* \[ **key**: *string*\]: object

Actions exposed by other analytics packages.

* **sendEvent**? : *[Action](../modules/types.md#action)‹[Analytics](analytics.analytics-1.md), [Event](analytics.event.md)›*

* **sendPageview**? : *[Action](../modules/types.md#action)‹[Analytics](analytics.analytics-1.md), [Pageview](analytics.pageview.md)›*

* **analytics**(): *object*

  * **sendEvent**: *[Action](../modules/types.md#action)‹[Analytics](analytics.analytics-1.md), [Event](analytics.event.md)›*

  * **sendPageview**: *[Action](../modules/types.md#action)‹[Analytics](analytics.analytics-1.md), [Pageview](analytics.pageview.md)›*

___

### `Optional` fills

• **fills**? : *object*

*Inherited from [Package](types.package.md).[fills](types.package.md#optional-fills)*

*Defined in [packages/types/src/package.ts:6](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/package.ts#L6)*

#### Type declaration:

* \[ **namespace**: *string*\]: React.ReactType

___

### `Optional` libraries

• **libraries**? : *object*

*Inherited from [Package](types.package.md).[libraries](types.package.md#optional-libraries)*

*Defined in [packages/types/src/package.ts:70](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/package.ts#L70)*

#### Type declaration:

* \[ **namespace**: *string*\]: object

* \[ **library**: *string*\]: any

___

### `Optional` name

• **name**? : *string*

*Inherited from [Package](types.package.md).[name](types.package.md#optional-name)*

*Defined in [packages/types/src/package.ts:2](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/package.ts#L2)*

___

###  roots

• **roots**: *object*

*Overrides [Package](types.package.md).[roots](types.package.md#optional-roots)*

*Defined in [packages/analytics/types.ts:28](https://github.com/frontity/frontity/blob/8f93b4e4/packages/analytics/types.ts#L28)*

#### Type declaration:

* **analytics**: *React.FC*

___

###  state

• **state**: *object*

*Overrides [Package](types.package.md).[state](types.package.md#optional-state)*

*Defined in [packages/analytics/types.ts:54](https://github.com/frontity/frontity/blob/8f93b4e4/packages/analytics/types.ts#L54)*

#### Type declaration:

* **analytics**(): *object*

  * **namespaces**: *string[]*

* **router**(): *object*

  * **link**: *string*

* **source**(): *object*

  * **get**: *Source["state"]["source"]["get"]*
