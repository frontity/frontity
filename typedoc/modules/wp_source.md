[Frontity](../README.md) › [Globals](../globals.md) › [wp-source](wp_source.md)

# Package: wp-source

## Index

### Type aliases

* [Handler](wp_source.md#handler)
* [Pattern](wp_source.md#pattern)
* [Redirection](wp_source.md#redirection)

### Variables

* [attachment](wp_source.md#const-attachment)
* [attachmentEntities](wp_source.md#const-attachmententities)
* [attachmentEntity](wp_source.md#const-attachmententity)
* [authorEntities](wp_source.md#const-authorentities)
* [authorEntity](wp_source.md#const-authorentity)
* [category](wp_source.md#const-category)
* [entity](wp_source.md#const-entity)
* [list](wp_source.md#const-list)
* [page](wp_source.md#const-page)
* [post](wp_source.md#const-post)
* [postArchive](wp_source.md#const-postarchive)
* [postEntities](wp_source.md#const-postentities)
* [postEntity](wp_source.md#const-postentity)
* [postType](wp_source.md#const-posttype)
* [postType](wp_source.md#const-posttype)
* [tag](wp_source.md#const-tag)
* [taxonomyEntities](wp_source.md#const-taxonomyentities)
* [taxonomyEntity](wp_source.md#const-taxonomyentity)
* [taxonomyType](wp_source.md#const-taxonomytype)

### Functions

* [addFinalSlash](wp_source.md#const-addfinalslash)
* [concatPath](wp_source.md#const-concatpath)
* [dateHandler](wp_source.md#const-datehandler)
* [decomposeRoute](wp_source.md#const-decomposeroute)
* [execMatch](wp_source.md#const-execmatch)
* [getMatch](wp_source.md#const-getmatch)
* [getTotal](wp_source.md#const-gettotal)
* [getTotalPages](wp_source.md#const-gettotalpages)
* [normalize](wp_source.md#const-normalize)
* [objToQuery](wp_source.md#const-objtoquery)
* [paramsToRoute](wp_source.md#const-paramstoroute)
* [parse](wp_source.md#const-parse)
* [queryToObj](wp_source.md#const-querytoobj)
* [routeToParams](wp_source.md#const-routetoparams)
* [stringify](wp_source.md#const-stringify)

## Type aliases

###  Handler

Ƭ **Handler**: *function*

*Defined in [packages/wp-source/types.ts:12](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/types.ts#L12)*

#### Type declaration:

▸ (`args`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`force?` | boolean |
`libraries` | Pkg["libraries"] |
`link` | string |
`params` | object |
`route` | string |
`state` | [State](types.md#state)‹Pkg› |

___

###  Pattern

Ƭ **Pattern**: *object*

*Defined in [packages/wp-source/types.ts:5](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/types.ts#L5)*

#### Type declaration:

* **func**: *F*

* **name**: *string*

* **pattern**: *string*

* **priority**: *number*

___

###  Redirection

Ƭ **Redirection**: *function*

*Defined in [packages/wp-source/types.ts:50](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/types.ts#L50)*

#### Type declaration:

▸ (`params?`: Record‹string, string›): *string*

**Parameters:**

Name | Type |
------ | ------ |
`params?` | Record‹string, string› |

## Variables

### `Const` attachment

• **attachment**: *function* = postTypeHandler({ endpoints: ["media"] })

*Defined in [packages/wp-source/src/libraries/handlers/index.ts:10](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/handlers/index.ts#L10)*

#### Type declaration:

▸ (`args`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`force?` | boolean |
`libraries` | Pkg["libraries"] |
`link` | string |
`params` | object |
`route` | string |
`state` | [State](types.md#state)‹Pkg› |

___

### `Const` attachmentEntities

• **attachmentEntities**: *Array‹any›* = new schema.Array(attachmentEntity)

*Defined in [packages/wp-source/src/libraries/schemas/attachments.ts:21](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/attachments.ts#L21)*

___

### `Const` attachmentEntity

• **attachmentEntity**: *Entity‹any›* = new schema.Entity(
  "attachmentEntity",
  {
    _embedded: {
      author: [authorEntity],
    },
  },
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      return result;
    },
  }
)

*Defined in [packages/wp-source/src/libraries/schemas/attachments.ts:5](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/attachments.ts#L5)*

___

### `Const` authorEntities

• **authorEntities**: *Array‹any›* = new schema.Array(authorEntity)

*Defined in [packages/wp-source/src/libraries/schemas/authors.ts:15](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/authors.ts#L15)*

___

### `Const` authorEntity

• **authorEntity**: *Entity‹any›* = new schema.Entity(
  "authorEntity",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      return result;
    },
  }
)

*Defined in [packages/wp-source/src/libraries/schemas/authors.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/authors.ts#L4)*

___

### `Const` category

• **category**: *function* = taxonomyHandler({
  taxonomy: "category",
  endpoint: "categories",
})

*Defined in [packages/wp-source/src/libraries/handlers/index.ts:17](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/handlers/index.ts#L17)*

#### Type declaration:

▸ (`args`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`force?` | boolean |
`libraries` | Pkg["libraries"] |
`link` | string |
`params` | object |
`route` | string |
`state` | [State](types.md#state)‹Pkg› |

___

### `Const` entity

• **entity**: *Union‹any›* = new schema.Union(
  {
    postEntity,
    postType,
    taxonomyEntity,
    taxonomyType,
    authorEntity,
    attachmentEntity,
  },
  (val) => {
    if (val.taxonomies && val.rest_base) return "postType";
    else if (val.types && val.rest_base) return "taxonomyType";
    else if (val.taxonomy) return "taxonomyEntity";
    else if (val.media_type) return "attachmentEntity";
    else if (val.name) return "authorEntity";
    return "postEntity";
  }
)

*Defined in [packages/wp-source/src/libraries/schemas/index.ts:7](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/index.ts#L7)*

___

### `Const` list

• **list**: *Array‹any›* = new schema.Array(entity)

*Defined in [packages/wp-source/src/libraries/schemas/index.ts:26](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/index.ts#L26)*

___

### `Const` page

• **page**: *function* = postTypeHandler({ endpoints: ["pages"] })

*Defined in [packages/wp-source/src/libraries/handlers/index.ts:9](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/handlers/index.ts#L9)*

#### Type declaration:

▸ (`args`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`force?` | boolean |
`libraries` | Pkg["libraries"] |
`link` | string |
`params` | object |
`route` | string |
`state` | [State](types.md#state)‹Pkg› |

___

### `Const` post

• **post**: *function* = postTypeHandler({ endpoints: ["posts"] })

*Defined in [packages/wp-source/src/libraries/handlers/index.ts:8](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/handlers/index.ts#L8)*

#### Type declaration:

▸ (`args`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`force?` | boolean |
`libraries` | Pkg["libraries"] |
`link` | string |
`params` | object |
`route` | string |
`state` | [State](types.md#state)‹Pkg› |

___

### `Const` postArchive

• **postArchive**: *function* = postTypeArchiveHandler({
  type: "post",
  endpoint: "posts",
})

*Defined in [packages/wp-source/src/libraries/handlers/index.ts:23](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/handlers/index.ts#L23)*

#### Type declaration:

▸ (`args`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`force?` | boolean |
`libraries` | Pkg["libraries"] |
`link` | string |
`params` | object |
`route` | string |
`state` | [State](types.md#state)‹Pkg› |

___

### `Const` postEntities

• **postEntities**: *Array‹any›* = new schema.Array(postEntity)

*Defined in [packages/wp-source/src/libraries/schemas/posts.ts:48](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/posts.ts#L48)*

___

### `Const` postEntity

• **postEntity**: *Entity‹any›* = new schema.Entity(
  "postEntity",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      return result;
    },
  }
)

*Defined in [packages/wp-source/src/libraries/schemas/posts.ts:26](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/posts.ts#L26)*

___

### `Const` postType

• **postType**: *Entity‹any›* = new schema.Entity(
  "postType",
  {},
  {
    idAttribute: "slug",
    processStrategy(entity) {
      const result = { ...entity };

      // Change "post_tag" to "tag"
      if (result.taxonomies)
        result.taxonomies = result.taxonomies.map((slug) =>
          slug === "post_tag" ? "tag" : slug
        );

      return result;
    },
  }
)

*Defined in [packages/wp-source/src/libraries/schemas/posts.ts:7](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/posts.ts#L7)*

___

### `Const` postType

• **postType**: *function* = postTypeHandler({
  endpoints: ["posts", "pages", "media"],
})

*Defined in [packages/wp-source/src/libraries/handlers/index.ts:11](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/handlers/index.ts#L11)*

#### Type declaration:

▸ (`args`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`force?` | boolean |
`libraries` | Pkg["libraries"] |
`link` | string |
`params` | object |
`route` | string |
`state` | [State](types.md#state)‹Pkg› |

___

### `Const` tag

• **tag**: *function* = taxonomyHandler({ taxonomy: "tag", endpoint: "tags" })

*Defined in [packages/wp-source/src/libraries/handlers/index.ts:16](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/handlers/index.ts#L16)*

#### Type declaration:

▸ (`args`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`force?` | boolean |
`libraries` | Pkg["libraries"] |
`link` | string |
`params` | object |
`route` | string |
`state` | [State](types.md#state)‹Pkg› |

___

### `Const` taxonomyEntities

• **taxonomyEntities**: *Array‹any›* = new schema.Array(taxonomyEntity)

*Defined in [packages/wp-source/src/libraries/schemas/taxonomies.ts:19](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/taxonomies.ts#L19)*

___

### `Const` taxonomyEntity

• **taxonomyEntity**: *Entity‹any›* = new schema.Entity(
  "taxonomyEntity",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      result.taxonomy =
        result.taxonomy === "post_tag" ? "tag" : result.taxonomy;
      return result;
    },
  }
)

*Defined in [packages/wp-source/src/libraries/schemas/taxonomies.ts:6](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/taxonomies.ts#L6)*

___

### `Const` taxonomyType

• **taxonomyType**: *Entity‹any›* = new schema.Entity("taxonomyType")

*Defined in [packages/wp-source/src/libraries/schemas/taxonomies.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/schemas/taxonomies.ts#L4)*

## Functions

### `Const` addFinalSlash

▸ **addFinalSlash**(`path`: string): *string*

*Defined in [packages/wp-source/src/libraries/route-utils.ts:4](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/route-utils.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *string*

___

### `Const` concatPath

▸ **concatPath**(...`paths`: string[]): *string*

*Defined in [packages/wp-source/src/libraries/route-utils.ts:23](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/route-utils.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`...paths` | string[] |

**Returns:** *string*

___

### `Const` dateHandler

▸ **dateHandler**(`__namedParameters`: object): *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

*Defined in [packages/wp-source/src/libraries/handlers/date.ts:5](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/handlers/date.ts#L5)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`force` | boolean |
`libraries` | object |
`linkArg` | string |
`params` | object |
`routeArg` | string |
`state` | object |

**Returns:** *[Promise](../classes/frontity.eventpromised.md#static-promise)‹void›*

___

### `Const` decomposeRoute

▸ **decomposeRoute**(`route`: string): *object*

*Defined in [packages/wp-source/src/libraries/route-utils.ts:28](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/route-utils.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`route` | string |

**Returns:** *object*

* **hash**: *string*

* **pathname**: *string*

* **query**: *string*

___

### `Const` execMatch

▸ **execMatch**(`path`: string, `__namedParameters`: object): *object*

*Defined in [packages/wp-source/src/libraries/get-match.ts:18](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/get-match.ts#L18)*

**Parameters:**

▪ **path**: *string*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`keys` | Key[] |
`regexp` | RegExp‹› |

**Returns:** *object*

___

### `Const` getMatch

▸ **getMatch**(`path`: string, `list`: T[]): *object*

*Defined in [packages/wp-source/src/libraries/get-match.ts:27](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/get-match.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`list` | T[] |

**Returns:** *object*

* **func**(): *function*

  * (`params`: any): *any*

* **name**: *string* = result.name

* **params**(): *object*

___

### `Const` getTotal

▸ **getTotal**(`response`: Response, `valueIfHeaderMissing`: number): *number*

*Defined in [packages/wp-source/src/libraries/response-utils.ts:3](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/response-utils.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | Response |
`valueIfHeaderMissing` | number |

**Returns:** *number*

___

### `Const` getTotalPages

▸ **getTotalPages**(`response`: Response, `valueIfHeaderMissing`: number): *number*

*Defined in [packages/wp-source/src/libraries/response-utils.ts:8](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/response-utils.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | Response |
`valueIfHeaderMissing` | number |

**Returns:** *number*

___

### `Const` normalize

▸ **normalize**(`route`: string): *string*

*Defined in [packages/wp-source/src/libraries/route-utils.ts:85](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/route-utils.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`route` | string |

**Returns:** *string*

___

### `Const` objToQuery

▸ **objToQuery**(`obj`: Record‹string, any›): *string*

*Defined in [packages/wp-source/src/libraries/route-utils.ts:16](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/route-utils.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | Record‹string, any› |

**Returns:** *string*

___

### `Const` paramsToRoute

▸ **paramsToRoute**(`__namedParameters`: object): *string*

*Defined in [packages/wp-source/src/libraries/route-utils.ts:59](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/route-utils.ts#L59)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`hash` | string | "" |
`page` | number | 1 |
`path` | string | "/" |
`query` | object | - |
`route` | string | - |

**Returns:** *string*

___

### `Const` parse

▸ **parse**(`route`: string): *object*

*Defined in [packages/wp-source/src/libraries/route-utils.ts:78](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/route-utils.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`route` | string |

**Returns:** *object*

* **hash**? : *string*

* **page**? : *number*

* **path**? : *string*

* **query**? : *Record‹string, any›*

* **route**? : *string*

___

### `Const` queryToObj

▸ **queryToObj**(`query`: string): *object*

*Defined in [packages/wp-source/src/libraries/route-utils.ts:7](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/route-utils.ts#L7)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`query` | string | "" |

**Returns:** *object*

___

### `Const` routeToParams

▸ **routeToParams**(`route`: string): *[RouteParams](source.md#routeparams)*

*Defined in [packages/wp-source/src/libraries/route-utils.ts:41](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/route-utils.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`route` | string |

**Returns:** *[RouteParams](source.md#routeparams)*

___

### `Const` stringify

▸ **stringify**(`routeParams`: object): *string*

*Defined in [packages/wp-source/src/libraries/route-utils.ts:81](https://github.com/frontity/frontity/blob/8f93b4e4/packages/wp-source/src/libraries/route-utils.ts#L81)*

**Parameters:**

▪ **routeParams**: *object*

Name | Type |
------ | ------ |
`hash?` | string |
`page?` | number |
`path?` | string |
`query?` | Record‹string, any› |
`route?` | string |

**Returns:** *string*
