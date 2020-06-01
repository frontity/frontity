[Frontity](../README.md) › [Globals](../globals.md) › [head-tags](head_tags.md)

# Package: head-tags

## Index

### Type aliases

* [AuthorEntityWithHeadTags](head_tags.md#authorentitywithheadtags)
* [HeadTag](head_tags.md#headtag)
* [HeadTags](head_tags.md#headtags)
* [Merge](head_tags.md#merge)
* [PostEntityWithHeadTags](head_tags.md#postentitywithheadtags)
* [PostTypeWithHeadTags](head_tags.md#posttypewithheadtags)
* [State](head_tags.md#state)
* [TaxonomyWithHeadTags](head_tags.md#taxonomywithheadtags)
* [WithHeadTags](head_tags.md#withheadtags)

### Functions

* [getCurrentEntity](head_tags.md#const-getcurrententity)
* [getCurrentHeadTags](head_tags.md#const-getcurrentheadtags)
* [useFrontityLinks](head_tags.md#const-usefrontitylinks)

## Type aliases

###  AuthorEntityWithHeadTags

Ƭ **AuthorEntityWithHeadTags**: *[Merge](head_tags.md#merge)‹AuthorEntity, [WithHeadTags](head_tags.md#withheadtags)›*

*Defined in [packages/head-tags/types.ts:33](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/types.ts#L33)*

___

###  HeadTag

Ƭ **HeadTag**: *object*

*Defined in [packages/head-tags/types.ts:20](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/types.ts#L20)*

#### Type declaration:

* **attributes**? : *Record‹string, string›*

* **content**? : *string*

* **tag**: *"meta" | "link" | "title" | "style" | "script" | "noscript" | "base"*

___

###  HeadTags

Ƭ **HeadTags**: *[HeadTag](head_tags.md#headtag)[]*

*Defined in [packages/head-tags/types.ts:25](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/types.ts#L25)*

___

###  Merge

Ƭ **Merge**: *Omit‹M, Extract‹keyof M, keyof N›› & N*

*Defined in [packages/head-tags/types.ts:18](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/types.ts#L18)*

Create a new type by merging two types.
The second type overrides those attributes that are present in the first one.

**`returns`** Merged types.

___

###  PostEntityWithHeadTags

Ƭ **PostEntityWithHeadTags**: *[Merge](head_tags.md#merge)‹PostEntity, [WithHeadTags](head_tags.md#withheadtags)›*

*Defined in [packages/head-tags/types.ts:31](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/types.ts#L31)*

___

###  PostTypeWithHeadTags

Ƭ **PostTypeWithHeadTags**: *[Merge](head_tags.md#merge)‹PostType, [WithHeadTags](head_tags.md#withheadtags)›*

*Defined in [packages/head-tags/types.ts:32](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/types.ts#L32)*

___

###  State

Ƭ **State**: *InitializedStore<HeadTagsPackage>["state"]*

*Defined in [packages/head-tags/types.ts:71](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/types.ts#L71)*

___

###  TaxonomyWithHeadTags

Ƭ **TaxonomyWithHeadTags**: *[Merge](head_tags.md#merge)‹TaxonomyEntity, [WithHeadTags](head_tags.md#withheadtags)›*

*Defined in [packages/head-tags/types.ts:34](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/types.ts#L34)*

___

###  WithHeadTags

Ƭ **WithHeadTags**: *object*

*Defined in [packages/head-tags/types.ts:27](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/types.ts#L27)*

#### Type declaration:

* **head_tags**? : *[HeadTags](head_tags.md#headtags)*

## Functions

### `Const` getCurrentEntity

▸ **getCurrentEntity**(`__namedParameters`: object): *object & object | object & object | object*

*Defined in [packages/head-tags/src/utils/index.ts:161](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/src/utils/index.ts#L161)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`link` | string |
`state` | object |

**Returns:** *object & object | object & object | object*

___

### `Const` getCurrentHeadTags

▸ **getCurrentHeadTags**(`__namedParameters`: object): *object[]*

*Defined in [packages/head-tags/src/utils/index.ts:197](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/src/utils/index.ts#L197)*

Get the head tags stored in the current entity,
or an empty array if there is no entity or head tags.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`link` | string |
`state` | object |

**Returns:** *object[]*

___

### `Const` useFrontityLinks

▸ **useFrontityLinks**(`__namedParameters`: object): *object[]*

*Defined in [packages/head-tags/src/utils/index.ts:77](https://github.com/frontity/frontity/blob/8f93b4e4/packages/head-tags/src/utils/index.ts#L77)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`headTags` | object[] |
`state` | object |

**Returns:** *object[]*
