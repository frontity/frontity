[frontity](../README.md) › [Globals](../globals.md) › ["frontity/src/utils/getProcessForPort"](_frontity_src_utils_getprocessforport_.md)

# Module: "frontity/src/utils/getProcessForPort"

## Index

### Functions

* [getDirectoryOfProcessById](_frontity_src_utils_getprocessforport_.md#getdirectoryofprocessbyid)
* [getPackageNameInDirectory](_frontity_src_utils_getprocessforport_.md#getpackagenameindirectory)
* [getProcessCommand](_frontity_src_utils_getprocessforport_.md#getprocesscommand)
* [getProcessForPort](_frontity_src_utils_getprocessforport_.md#getprocessforport)
* [getProcessIdOnPort](_frontity_src_utils_getprocessforport_.md#getprocessidonport)
* [isProcessAReactApp](_frontity_src_utils_getprocessforport_.md#isprocessareactapp)

### Object literals

* [execOptions](_frontity_src_utils_getprocessforport_.md#const-execoptions)

## Functions

###  getDirectoryOfProcessById

▸ **getDirectoryOfProcessById**(`processId`: any): *string*

*Defined in [packages/frontity/src/utils/getProcessForPort.ts:50](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/getProcessForPort.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`processId` | any |

**Returns:** *string*

___

###  getPackageNameInDirectory

▸ **getPackageNameInDirectory**(`directory`: any): *any*

*Defined in [packages/frontity/src/utils/getProcessForPort.ts:24](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/getProcessForPort.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`directory` | any |

**Returns:** *any*

___

###  getProcessCommand

▸ **getProcessCommand**(`processId`: any, `processDirectory`: any): *any*

*Defined in [packages/frontity/src/utils/getProcessForPort.ts:34](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/getProcessForPort.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`processId` | any |
`processDirectory` | any |

**Returns:** *any*

___

###  getProcessForPort

▸ **getProcessForPort**(`port`: any): *string*

*Defined in [packages/frontity/src/utils/getProcessForPort.ts:59](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/getProcessForPort.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`port` | any |

**Returns:** *string*

___

###  getProcessIdOnPort

▸ **getProcessIdOnPort**(`port`: any): *string*

*Defined in [packages/frontity/src/utils/getProcessForPort.ts:18](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/getProcessForPort.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`port` | any |

**Returns:** *string*

___

###  isProcessAReactApp

▸ **isProcessAReactApp**(`processCommand`: any): *boolean*

*Defined in [packages/frontity/src/utils/getProcessForPort.ts:14](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/getProcessForPort.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`processCommand` | any |

**Returns:** *boolean*

## Object literals

### `Const` execOptions

### ▪ **execOptions**: *object*

*Defined in [packages/frontity/src/utils/getProcessForPort.ts:5](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/getProcessForPort.ts#L5)*

###  encoding

• **encoding**: *"utf8"* = "utf8"

*Defined in [packages/frontity/src/utils/getProcessForPort.ts:6](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/getProcessForPort.ts#L6)*

###  stdio

• **stdio**: *"pipe" | "ignore"[]* = [
    "pipe", // stdin (default)
    "pipe", // stdout (default)
    "ignore", //stderr
  ]

*Defined in [packages/frontity/src/utils/getProcessForPort.ts:7](https://github.com/frontity/frontity/blob/eb6bfe49/packages/frontity/src/utils/getProcessForPort.ts#L7)*
