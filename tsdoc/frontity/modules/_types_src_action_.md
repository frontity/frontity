[frontity](../README.md) › [Globals](../globals.md) › ["types/src/action"](_types_src_action_.md)

# Module: "types/src/action"

## Index

### Type aliases

* [Action](_types_src_action_.md#action)
* [Arguments](_types_src_action_.md#arguments)
* [AsyncAction](_types_src_action_.md#asyncaction)
* [Context](_types_src_action_.md#context)
* [ServerAction](_types_src_action_.md#serveraction)

## Type aliases

###  Action

Ƭ **Action**: *[A1] extends [null] ? function : function*

*Defined in [packages/types/src/action.ts:33](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/action.ts#L33)*

___

###  Arguments

Ƭ **Arguments**: *[A1] extends [null] ? [] : [A2] extends [null] ? [A1] : [A3] extends [null] ? [A1, A2] : [A4] extends [null] ? [A1, A2, A3] : [A5] extends [null] ? [A1, A2, A3, A4] : [A6] extends [null] ? [A1, A2, A3, A4, A5] : [A7] extends [null] ? [A1, A2, A3, A4, A5, A6] : [A8] extends [null] ? [A1, A2, A3, A4, A5, A6, A7] : [A9] extends [null] ? [A1, A2, A3, A4, A5, A6, A7, A8] : [A10] extends [null] ? [A1, A2, A3, A4, A5, A6, A7, A8, A9] : [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10]*

*Defined in [packages/types/src/action.ts:11](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/action.ts#L11)*

Tricky utility for defining list of arguments.

Hopefully, the https://github.com/microsoft/TypeScript/issues/5453 proposal
would avoid this kind of type definitions.

___

###  AsyncAction

Ƭ **AsyncAction**: *[A1] extends [null] ? function : function*

*Defined in [packages/types/src/action.ts:98](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/action.ts#L98)*

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

###  Context

Ƭ **Context**: *Koa.ParameterizedContext‹Koa.DefaultState, Koa.DefaultContext›*

*Defined in [packages/types/src/action.ts:132](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/action.ts#L132)*

___

###  ServerAction

Ƭ **ServerAction**: *[AsyncAction](_types_src_action_.md#asyncaction)‹Pkg, object›*

*Defined in [packages/types/src/action.ts:137](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/action.ts#L137)*
