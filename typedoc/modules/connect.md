[Frontity](../README.md) › [Globals](../globals.md) › [connect](connect.md)

# Package: connect

## Index

### References

* [Provider](connect.md#provider)
* [batch](connect.md#batch)
* [createStore](connect.md#createstore)
* [default](connect.md#default)
* [getSnapshot](connect.md#getsnapshot)
* [isObservable](connect.md#isobservable)
* [observable](connect.md#observable)
* [observe](connect.md#observe)
* [raw](connect.md#raw)
* [unobserve](connect.md#unobserve)
* [useConnect](connect.md#useconnect)

### Variables

* [Provider](connect.md#const-provider)
* [proxyToRaw](connect.md#const-proxytoraw)
* [rawToProxy](connect.md#const-rawtoproxy)
* [rawToRoot](connect.md#const-rawtoroot)

### Functions

* [batch](connect.md#batch)
* [connect](connect.md#connect)
* [createStore](connect.md#const-createstore)
* [getHandlers](connect.md#gethandlers)
* [getReactionsForOperation](connect.md#getreactionsforoperation)
* [getSnapshot](connect.md#const-getsnapshot)
* [hasRunningReaction](connect.md#hasrunningreaction)
* [isObservable](connect.md#isobservable)
* [observable](connect.md#observable)
* [observe](connect.md#observe)
* [queueReactionsForOperation](connect.md#queuereactionsforoperation)
* [raw](connect.md#raw)
* [registerReactionForOperation](connect.md#registerreactionforoperation)
* [registerRunningReactionForOperation](connect.md#registerrunningreactionforoperation)
* [releaseReaction](connect.md#releasereaction)
* [runAsReaction](connect.md#runasreaction)
* [shouldInstrument](connect.md#shouldinstrument)
* [storeObservable](connect.md#storeobservable)
* [unobserve](connect.md#unobserve)
* [useConnect](connect.md#const-useconnect)

## References

###  Provider

• **Provider**:

___

###  batch

• **batch**:

___

###  createStore

• **createStore**:

___

###  default

• **default**:

___

###  getSnapshot

• **getSnapshot**:

___

###  isObservable

• **isObservable**:

___

###  observable

• **observable**:

___

###  observe

• **observe**:

___

###  raw

• **raw**:

___

###  unobserve

• **unobserve**:

___

###  useConnect

• **useConnect**:

## Variables

### `Const` Provider

• **Provider**: *ProviderExoticComponent‹ProviderProps‹any››* = context.Provider

*Defined in [packages/connect/src/connect.js:19](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/connect.js#L19)*

___

### `Const` proxyToRaw

• **proxyToRaw**: *WeakMap‹object, any›* = new WeakMap()

*Defined in [packages/connect/src/internals.js:1](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/internals.js#L1)*

___

### `Const` rawToProxy

• **rawToProxy**: *WeakMap‹object, any›* = new WeakMap()

*Defined in [packages/connect/src/internals.js:2](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/internals.js#L2)*

___

### `Const` rawToRoot

• **rawToRoot**: *WeakMap‹object, any›* = new WeakMap()

*Defined in [packages/connect/src/internals.js:3](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/internals.js#L3)*

## Functions

###  batch

▸ **batch**(`fn`: any, `ctx`: any, `args`: any): *undefined*

*Defined in [packages/connect/src/scheduler.js:8](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/scheduler.js#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`fn` | any |
`ctx` | any |
`args` | any |

**Returns:** *undefined*

___

###  connect

▸ **connect**(`Comp`: any, `options`: any): *NamedExoticComponent‹object› | ReactiveClassComp*

*Defined in [packages/connect/src/connect.js:36](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/connect.js#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`Comp` | any |
`options` | any |

**Returns:** *NamedExoticComponent‹object› | ReactiveClassComp*

___

### `Const` createStore

▸ **createStore**(`store`: any): *any*

*Defined in [packages/connect/src/create-store.js:50](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/create-store.js#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`store` | any |

**Returns:** *any*

___

###  getHandlers

▸ **getHandlers**(`obj`: any): *object*

*Defined in [packages/connect/src/builtIns/index.js:37](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/builtIns/index.js#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *object*

* **get**(`target`: any, `key`: any, `receiver`: any): *any*

___

###  getReactionsForOperation

▸ **getReactionsForOperation**(`__namedParameters`: object): *Set‹any›*

*Defined in [packages/connect/src/store.js:36](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/store.js#L36)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`key` | any |
`target` | any |
`type` | any |

**Returns:** *Set‹any›*

___

### `Const` getSnapshot

▸ **getSnapshot**(`obj`: any): *any*

*Defined in [packages/connect/src/create-store.js:3](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/create-store.js#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *any*

___

###  hasRunningReaction

▸ **hasRunningReaction**(): *boolean*

*Defined in [packages/connect/src/reactionRunner.js:34](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/reactionRunner.js#L34)*

**Returns:** *boolean*

___

###  isObservable

▸ **isObservable**(`obj`: any): *boolean*

*Defined in [packages/connect/src/observable.js:31](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/observable.js#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

###  observable

▸ **observable**(`obj`: object, `root`: any): *any*

*Defined in [packages/connect/src/observable.js:19](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/observable.js#L19)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`obj` | object | {} |
`root` | any | null |

**Returns:** *any*

___

###  observe

▸ **observe**(`fn`: any, `options`: object): *any*

*Defined in [packages/connect/src/observer.js:6](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/observer.js#L6)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fn` | any | - |
`options` | object | {} |

**Returns:** *any*

___

###  queueReactionsForOperation

▸ **queueReactionsForOperation**(`operation`: any): *void*

*Defined in [packages/connect/src/reactionRunner.js:73](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/reactionRunner.js#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`operation` | any |

**Returns:** *void*

___

###  raw

▸ **raw**(`obj`: any): *any*

*Defined in [packages/connect/src/observable.js:35](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/observable.js#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *any*

___

###  registerReactionForOperation

▸ **registerReactionForOperation**(`reaction`: any, `__namedParameters`: object): *void*

*Defined in [packages/connect/src/store.js:9](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/store.js#L9)*

**Parameters:**

▪ **reaction**: *any*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`key` | any |
`target` | any |
`type` | any |

**Returns:** *void*

___

###  registerRunningReactionForOperation

▸ **registerRunningReactionForOperation**(`operation`: any): *void*

*Defined in [packages/connect/src/reactionRunner.js:64](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/reactionRunner.js#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`operation` | any |

**Returns:** *void*

___

###  releaseReaction

▸ **releaseReaction**(`reaction`: any): *void*

*Defined in [packages/connect/src/store.js:56](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/store.js#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`reaction` | any |

**Returns:** *void*

___

###  runAsReaction

▸ **runAsReaction**(`reaction`: any, `fn`: any, `context`: any, `args`: any): *any*

*Defined in [packages/connect/src/reactionRunner.js:38](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/reactionRunner.js#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`reaction` | any |
`fn` | any |
`context` | any |
`args` | any |

**Returns:** *any*

___

###  shouldInstrument

▸ **shouldInstrument**(`__namedParameters`: object): *boolean*

*Defined in [packages/connect/src/builtIns/index.js:29](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/builtIns/index.js#L29)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`constructor` | any |

**Returns:** *boolean*

___

###  storeObservable

▸ **storeObservable**(`obj`: any): *void*

*Defined in [packages/connect/src/store.js:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/store.js#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *void*

___

###  unobserve

▸ **unobserve**(`reaction`: any): *void*

*Defined in [packages/connect/src/observer.js:25](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/observer.js#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`reaction` | any |

**Returns:** *void*

___

### `Const` useConnect

▸ **useConnect**(): *any*

*Defined in [packages/connect/src/connect.js:187](https://github.com/frontity/frontity/blob/8f93b4e4/packages/connect/src/connect.js#L187)*

**Returns:** *any*
