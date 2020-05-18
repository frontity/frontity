[frontity](../README.md) › [Globals](../globals.md) › ["types/src/connect"](../modules/_types_src_connect_.md) › [ConnectFunction](_types_src_connect_.connectfunction.md)

# Interface: ConnectFunction

## Hierarchy

* **ConnectFunction**

## Callable

▸ <**Comp**>(`comp`: Comp): *FunctionComponent‹[FilterInjectedProps](../modules/_types_src_utils_.md#filterinjectedprops)‹ComponentProps‹Comp›››*

*Defined in [packages/types/src/connect.ts:13](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/connect.ts#L13)*

Connect a React component to the Frontity state manager.

This function returns the same component it receives but passing
`state`, `actions` and `libraries` as properties, and making it reactive
to changes on the state.

**Type parameters:**

▪ **Comp**: *FunctionComponent‹any›*

React component

**Parameters:**

Name | Type |
------ | ------ |
`comp` | Comp |

**Returns:** *FunctionComponent‹[FilterInjectedProps](../modules/_types_src_utils_.md#filterinjectedprops)‹ComponentProps‹Comp›››*

Input component connected to Frontity state

▸ <**Comp**>(`comp`: Comp): *ComponentClass‹[FilterInjectedProps](../modules/_types_src_utils_.md#filterinjectedprops)‹ComponentProps‹Comp›››*

*Defined in [packages/types/src/connect.ts:28](https://github.com/frontity/frontity/blob/eb6bfe49/packages/types/src/connect.ts#L28)*

Connect a React component to the Frontity state manager.

This function returns the same component it receives but passing
`state`, `actions` and `libraries` as properties, and making it reactive
to changes on the state.

**Type parameters:**

▪ **Comp**: *ComponentClass‹any›*

React component

**Parameters:**

Name | Type |
------ | ------ |
`comp` | Comp |

**Returns:** *ComponentClass‹[FilterInjectedProps](../modules/_types_src_utils_.md#filterinjectedprops)‹ComponentProps‹Comp›››*

Input component connected to Frontity state
