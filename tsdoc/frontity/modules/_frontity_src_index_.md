[frontity](../README.md) › [Globals](../globals.md) › ["frontity/src/index"](_frontity_src_index_.md)

# Module: "frontity/src/index"

## Index

### References

* [Global](_frontity_src_index_.md#global)
* [Head](_frontity_src_index_.md#head)
* [HelmetProvider](_frontity_src_index_.md#helmetprovider)
* [URL](_frontity_src_index_.md#url)
* [batch](_frontity_src_index_.md#batch)
* [css](_frontity_src_index_.md#css)
* [error](_frontity_src_index_.md#error)
* [keyframes](_frontity_src_index_.md#keyframes)
* [loadable](_frontity_src_index_.md#loadable)
* [observe](_frontity_src_index_.md#observe)
* [styled](_frontity_src_index_.md#styled)
* [useConnect](_frontity_src_index_.md#useconnect)
* [warn](_frontity_src_index_.md#warn)

### Variables

* [connect](_frontity_src_index_.md#const-connect)
* [createStore](_frontity_src_index_.md#const-createstore)
* [decode](_frontity_src_index_.md#const-decode)
* [fetch](_frontity_src_index_.md#const-fetch)

## References

###  Global

• **Global**:

___

###  Head

• **Head**:

___

###  HelmetProvider

• **HelmetProvider**:

___

###  URL

• **URL**:

___

###  batch

• **batch**:

___

###  css

• **css**:

___

###  error

• **error**:

___

###  keyframes

• **keyframes**:

___

###  loadable

• **loadable**:

___

###  observe

• **observe**:

___

###  styled

• **styled**:

___

###  useConnect

• **useConnect**:

___

###  warn

• **warn**:

## Variables

### `Const` connect

• **connect**: *[ConnectFunction](../interfaces/_types_src_connect_.connectfunction.md)* = originalConnect as ConnectFunction

*Defined in [packages/frontity/src/index.ts:27](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/index.ts#L27)*

Connect a React component to the Frontity state manager.

This function returns the same component it receives but passing
`state`, `actions` and `libraries` as properties, and making it reactive
to changes on the state.

**`param`** React component

**`param`** Options object (see [connect](_frontity_src_index_.md#const-connect))

**`returns`** Input component connected to Frontity state

___

### `Const` createStore

• **createStore**: *[CreateStore](../interfaces/_types_src_connect_.createstore.md)* = originalCreateStore as CreateStore

*Defined in [packages/frontity/src/index.ts:28](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/index.ts#L28)*

___

### `Const` decode

• **decode**: *[Decode](../interfaces/_frontity_src_utils_decode_types_.decode.md)* = typeof window !== "undefined" ? decodeClient : decodeServer

*Defined in [packages/frontity/src/index.ts:36](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/index.ts#L36)*

___

### `Const` fetch

• **fetch**: *fetch* = (nodeFetch as any) as WindowOrWorkerGlobalScope["fetch"]

*Defined in [packages/frontity/src/index.ts:31](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/index.ts#L31)*
