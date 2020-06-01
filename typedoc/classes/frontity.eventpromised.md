[Frontity](../README.md) › [Globals](../globals.md) › [frontity](../modules/frontity.md) › [EventPromised](frontity.eventpromised.md)

# Class: EventPromised <**Events**>

## Type parameters

▪ **Events**

## Hierarchy

* [Promise](frontity.eventpromised.md#static-promise)‹any›

  ↳ **EventPromised**

## Index

### Constructors

* [constructor](frontity.eventpromised.md#constructor)

### Properties

* [[Symbol.toStringTag]](frontity.eventpromised.md#readonly-[symbol.tostringtag])
* [emitter](frontity.eventpromised.md#private-emitter)
* [Promise](frontity.eventpromised.md#static-promise)

### Methods

* [catch](frontity.eventpromised.md#catch)
* [finally](frontity.eventpromised.md#finally)
* [on](frontity.eventpromised.md#on)
* [once](frontity.eventpromised.md#once)
* [then](frontity.eventpromised.md#then)

## Constructors

###  constructor

\+ **new EventPromised**(`executor`: function, `emitter`: EventEmitter): *[EventPromised](frontity.eventpromised.md)*

*Defined in [packages/frontity/src/utils/eventPromised.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/eventPromised.ts#L4)*

**Parameters:**

▪ **executor**: *function*

▸ (`resolve`: function, `reject`: function, `emit`: function): *void*

**Parameters:**

▪ **resolve**: *function*

▸ (`value?`: any | PromiseLike‹any›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value?` | any &#124; PromiseLike‹any› |

▪ **reject**: *function*

▸ (`reason?`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`reason?` | any |

▪ **emit**: *function*

▸ (`event`: Events, ...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | Events |
`...args` | any[] |

▪`Default value`  **emitter**: *EventEmitter*= new EventEmitter()

**Returns:** *[EventPromised](frontity.eventpromised.md)*

## Properties

### `Readonly` [Symbol.toStringTag]

• **[Symbol.toStringTag]**: *string*

*Inherited from [EventPromised](frontity.eventpromised.md).[[Symbol.toStringTag]](frontity.eventpromised.md#readonly-[symbol.tostringtag])*

Defined in node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:169

___

### `Private` emitter

• **emitter**: *EventEmitter*

*Defined in [packages/frontity/src/utils/eventPromised.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/eventPromised.ts#L4)*

___

### `Static` Promise

▪ **Promise**: *PromiseConstructor*

Defined in node_modules/typescript/lib/lib.es2015.promise.d.ts:152

## Methods

###  catch

▸ **catch**<**TResult**>(`onrejected?`: function | undefined | null): *[Promise](frontity.eventpromised.md#static-promise)‹any | TResult›*

*Inherited from [EventPromised](frontity.eventpromised.md).[catch](frontity.eventpromised.md#catch)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1430

Attaches a callback for only the rejection of the Promise.

**Type parameters:**

▪ **TResult**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`onrejected?` | function &#124; undefined &#124; null | The callback to execute when the Promise is rejected. |

**Returns:** *[Promise](frontity.eventpromised.md#static-promise)‹any | TResult›*

A Promise for the completion of the callback.

___

###  finally

▸ **finally**(`onfinally?`: function | undefined | null): *[Promise](frontity.eventpromised.md#static-promise)‹any›*

*Inherited from [EventPromised](frontity.eventpromised.md).[finally](frontity.eventpromised.md#finally)*

Defined in node_modules/typescript/lib/lib.es2018.promise.d.ts:31

Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
resolved value cannot be modified from the callback.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`onfinally?` | function &#124; undefined &#124; null | The callback to execute when the Promise is settled (fulfilled or rejected). |

**Returns:** *[Promise](frontity.eventpromised.md#static-promise)‹any›*

A Promise for the completion of the callback.

___

###  on

▸ **on**(`eventName`: Events extends string ? Events : string | symbol, `onData`: function): *this*

*Defined in [packages/frontity/src/utils/eventPromised.ts:31](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/eventPromised.ts#L31)*

**Parameters:**

▪ **eventName**: *Events extends string ? Events : string | symbol*

▪ **onData**: *function*

▸ (...`data`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...data` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`eventName`: Events extends string ? Events : string | symbol, `onData`: function): *this*

*Defined in [packages/frontity/src/utils/eventPromised.ts:39](https://github.com/frontity/frontity/blob/8f93b4e4/packages/frontity/src/utils/eventPromised.ts#L39)*

**Parameters:**

▪ **eventName**: *Events extends string ? Events : string | symbol*

▪ **onData**: *function*

▸ (...`data`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...data` | any[] |

**Returns:** *this*

___

###  then

▸ **then**<**TResult1**, **TResult2**>(`onfulfilled?`: function | undefined | null, `onrejected?`: function | undefined | null): *[Promise](frontity.eventpromised.md#static-promise)‹TResult1 | TResult2›*

*Inherited from [EventPromised](frontity.eventpromised.md).[then](frontity.eventpromised.md#then)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1423

Attaches callbacks for the resolution and/or rejection of the Promise.

**Type parameters:**

▪ **TResult1**

▪ **TResult2**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`onfulfilled?` | function &#124; undefined &#124; null | The callback to execute when the Promise is resolved. |
`onrejected?` | function &#124; undefined &#124; null | The callback to execute when the Promise is rejected. |

**Returns:** *[Promise](frontity.eventpromised.md#static-promise)‹TResult1 | TResult2›*

A Promise for the completion of which ever callback is executed.
