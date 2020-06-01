[Frontity](../README.md) › [Globals](../globals.md) › [types](types.md)

# Package: types

## Index

### References

* [Action](types.md#action)
* [AsyncAction](types.md#asyncaction)
* [Connect](types.md#connect)
* [Context](types.md#context)
* [Derived](types.md#derived)
* [Package](types.md#package)
* [ServerAction](types.md#serveraction)
* [Settings](types.md#settings)
* [State](types.md#state)

### Interfaces

* [ConnectFunction](../interfaces/types.connectfunction.md)
* [CreateStore](../interfaces/types.createstore.md)
* [MonoSettings](../interfaces/types.monosettings.md)
* [MultiSettings](../interfaces/types.multisettings.md)
* [Package](../interfaces/types.package.md)

### Type aliases

* [Action](types.md#action)
* [AsyncAction](types.md#asyncaction)
* [Connect](types.md#connect)
* [Context](types.md#context)
* [Derived](types.md#derived)
* [FilterInjectedProps](types.md#filterinjectedprops)
* [ResolveActions](types.md#resolveactions)
* [ResolveState](types.md#resolvestate)
* [ServerAction](types.md#serveraction)
* [Settings](types.md#settings)
* [State](types.md#state)

## References

###  Action

• **Action**:

___

###  AsyncAction

• **AsyncAction**:

___

###  Connect

• **Connect**:

___

###  Context

• **Context**:

___

###  Derived

• **Derived**:

___

###  Package

• **Package**:

___

###  ServerAction

• **ServerAction**:

___

###  Settings

• **Settings**:

___

###  State

• **State**:

## Type aliases

###  Action

Ƭ **Action**: *[A1] extends [null] ? function : function*

*Defined in [packages/types/src/action.ts:33](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/action.ts#L33)*

___

###  AsyncAction

Ƭ **AsyncAction**: *[A1] extends [null] ? function : function*

*Defined in [packages/types/src/action.ts:98](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/action.ts#L98)*

Type for asynchronous actions.
The `A1`..`A10` parameters correspond to the arguments passed
to the action.abs.

**`example`** 
```
import { AsyncAction } from '@frontity/types';
interface Input = {
  input: string;
}

const actions: { myCustomAction: AsyncAction<MyPackage, Input> } = {
  myCustomAction: ({ state, libraries }) => async ({ input }) => {
    const result = await somePromise();
    console.log(input);
   }
}
```

Or simply:

**`example`** 
```
import { AsyncAction } from '@frontity/types';

const actions: { myCustomAction: AsyncAction<MyPackage>} = {
  myCustomAction: async ({ state, libraries }) => {
    const result = await somePromise();
   }
}
```

___

###  Connect

Ƭ **Connect**: *Omit‹Pkg, "state" | "actions" | "name" | "roots" | "fills"› & object & Props*

*Defined in [packages/types/src/connect.ts:5](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/connect.ts#L5)*

___

###  Context

Ƭ **Context**: *Koa.ParameterizedContext‹Koa.DefaultState, Koa.DefaultContext›*

*Defined in [packages/types/src/action.ts:132](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/action.ts#L132)*

___

###  Derived

Ƭ **Derived**: *[Output] extends [null] ? function : function*

*Defined in [packages/types/src/derived.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/derived.ts#L4)*

___

###  FilterInjectedProps

Ƭ **FilterInjectedProps**: *Omit‹T, "state" | "actions" | "libraries" | "roots" | "fills"›*

*Defined in [packages/types/src/utils.ts:38](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/utils.ts#L38)*

___

###  ResolveActions

Ƭ **ResolveActions**: *object*

*Defined in [packages/types/src/utils.ts:11](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/utils.ts#L11)*

#### Type declaration:

___

###  ResolveState

Ƭ **ResolveState**: *object*

*Defined in [packages/types/src/utils.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/utils.ts#L4)*

#### Type declaration:

___

###  ServerAction

Ƭ **ServerAction**: *[AsyncAction](types.md#asyncaction)‹Pkg, object›*

*Defined in [packages/types/src/action.ts:137](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/action.ts#L137)*

___

###  Settings

Ƭ **Settings**: *[MonoSettings](../interfaces/types.monosettings.md)‹Pkg› | [MultiSettings](../interfaces/types.multisettings.md)‹Pkg›[]*

*Defined in [packages/types/src/settings.ts:24](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/settings.ts#L24)*

___

###  State

Ƭ **State**: *[ResolveState](types.md#resolvestate)‹Pkg["state"]›*

*Defined in [packages/types/src/state.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/types/src/state.ts#L4)*
