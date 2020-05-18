[frontity](../README.md) › [Globals](../globals.md) › ["frontity/src/utils/eventPromised"](../modules/_frontity_src_utils_eventpromised_.md) › [EventPromised](_frontity_src_utils_eventpromised_.eventpromised.md)

# Class: EventPromised <**Events**>

## Type parameters

▪ **Events**

## Hierarchy

* [Promise](_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹any›

  ↳ **EventPromised**

## Index

### Constructors

* [constructor](_frontity_src_utils_eventpromised_.eventpromised.md#constructor)

### Properties

* [[Symbol.toStringTag]](_frontity_src_utils_eventpromised_.eventpromised.md#readonly-[symbol.tostringtag])
* [emitter](_frontity_src_utils_eventpromised_.eventpromised.md#private-emitter)
* [Promise](_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)

### Methods

* [catch](_frontity_src_utils_eventpromised_.eventpromised.md#catch)
* [finally](_frontity_src_utils_eventpromised_.eventpromised.md#finally)
* [on](_frontity_src_utils_eventpromised_.eventpromised.md#on)
* [once](_frontity_src_utils_eventpromised_.eventpromised.md#once)
* [then](_frontity_src_utils_eventpromised_.eventpromised.md#then)

## Constructors

###  constructor

\+ **new EventPromised**(`executor`: function, `emitter`: EventEmitter): *[EventPromised](_frontity_src_utils_eventpromised_.eventpromised.md)*

*Defined in [packages/frontity/src/utils/eventPromised.ts:4](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/eventPromised.ts#L4)*

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

**Returns:** *[EventPromised](_frontity_src_utils_eventpromised_.eventpromised.md)*

## Properties

### `Readonly` [Symbol.toStringTag]

• **[Symbol.toStringTag]**: *string*

*Inherited from [EventPromised](_frontity_src_utils_eventpromised_.eventpromised.md).[[Symbol.toStringTag]](_frontity_src_utils_eventpromised_.eventpromised.md#readonly-[symbol.tostringtag])*

Defined in node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:169

___

### `Private` emitter

• **emitter**: *EventEmitter*

*Defined in [packages/frontity/src/utils/eventPromised.ts:4](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/eventPromised.ts#L4)*

___

### `Static` Promise

▪ **Promise**: *PromiseConstructor*

Defined in node_modules/typescript/lib/lib.es2015.promise.d.ts:152

## Methods

###  catch

▸ **catch**<**TResult**>(`onrejected?`: function | undefined | null): *[Promise](_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹any | TResult›*

*Inherited from [EventPromised](_frontity_src_utils_eventpromised_.eventpromised.md).[catch](_frontity_src_utils_eventpromised_.eventpromised.md#catch)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1430

Attaches a callback for only the rejection of the Promise.

**Type parameters:**

▪ **TResult**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`onrejected?` | function &#124; undefined &#124; null | The callback to execute when the Promise is rejected. |

**Returns:** *[Promise](_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹any | TResult›*

A Promise for the completion of the callback.

___

###  finally

▸ **finally**(`onfinally?`: function | undefined | null): *[Promise](_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹any›*

*Inherited from [EventPromised](_frontity_src_utils_eventpromised_.eventpromised.md).[finally](_frontity_src_utils_eventpromised_.eventpromised.md#finally)*

Defined in node_modules/typescript/lib/lib.es2018.promise.d.ts:31

Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
resolved value cannot be modified from the callback.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`onfinally?` | function &#124; undefined &#124; null | The callback to execute when the Promise is settled (fulfilled or rejected). |

**Returns:** *[Promise](_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹any›*

A Promise for the completion of the callback.

___

###  on

▸ **on**(`eventName`: Events extends string ? Events : string | symbol, `onData`: function): *this*

*Defined in [packages/frontity/src/utils/eventPromised.ts:31](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/eventPromised.ts#L31)*

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

*Defined in [packages/frontity/src/utils/eventPromised.ts:39](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/eventPromised.ts#L39)*

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

▸ **then**<**TResult1**, **TResult2**>(`onfulfilled?`: function | undefined | null, `onrejected?`: function | undefined | null): *[Promise](_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹TResult1 | TResult2›*

*Inherited from [EventPromised](_frontity_src_utils_eventpromised_.eventpromised.md).[then](_frontity_src_utils_eventpromised_.eventpromised.md#then)*

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

**Returns:** *[Promise](_frontity_src_utils_eventpromised_.eventpromised.md#static-promise)‹TResult1 | TResult2›*

A Promise for the completion of which ever callback is executed.
