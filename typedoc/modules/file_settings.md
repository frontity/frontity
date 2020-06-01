[Frontity](../README.md) › [Globals](../globals.md) › [file-settings](file_settings.md)

# Package: file-settings

# File Settings

### _This is an internal package used by @frontity/core._

## Usage

This package is used to import the Frontity settings from a local file.

You can install it with `npm`:

```
npm i @frontity/file-settings
```

Here is a small example of how to use `getSettings`:

```js
import { getSettings } from "@frontity/file-settings";

const settings = await getSettings({
  name: "example-name",
  url: "https://example.site"
});
```

## API Reference

### `async getSettings(options) => settings`

Used to retrieve the settings from the `frontity.settings.js` file.

#### Parameters

**`options`** : `{ name?: string; url: string; }`

Used to match the right set of settings when there is more than one.

- **`options.name`** : `string (optional)`\
  The name of the set of settings you want to retrieve. When provided, `getSettings` won't use `options.url`.

- **`options.url`** : `string`\
  The url of the site using Frontity. The `matches` field of each set of settings will be tested against this url to determine which set of settings should be used.

#### Return

**`settings`** : `Settings`\
An object with type `Settings` containing a set of settings.

### `async getAllSites() => sites`

Used to retrieve all the sites with its name, mode and packages.

#### Return

**Sites**: `{ name: string; mode: string; packages: string[]; }[]`\
An array of sites containing name, mode and packages.

```js
[
  {
    name: "my-site-1",
    mode: "html",
    packages: ["package-1", "package-2"]
  },
  {
    name: "my-site-1-amp",
    mode: "amp",
    packages: ["package-1", "package-3"]
  },
  {
    name: "my-site-2",
    mode: "html",
    packages: ["package-1", "package-2"]
  }
];
```

## Settings File

The file must be located in the root directory of the project, it must be named `frontity.settings.ts` or `frontity.settings.js`, and it needs to export a serializable object.

The settings exported can be **mono settings** (only one):

```ts
{
  name?: string;
  match?: string[];
  mode?: string; // Default: "html"
  state?: object,
  packages: [
    string,
    {
      name: string;
      active?: boolean; // Default: true
      state?: object;
    }
  ]
}
```

Or **multi settings**:

```ts
// An array of more than one set of settings.
[
  {
    name: string; // Here name is mandatory and must be unique.
    match?: string[];
    mode?: string; // Default: "html"
    state?: { ... },
    packages: [ ... ]
  },
  {
    name: string; // Here name is mandatory and must be unique.
    match?: string[];
    mode?: string; // Default: "html"
    state?: { ... },
    packages: [ ... ]
  }
]
```

## Typescript

The `Settings` interface is exposed to be used in development. It can be accessed like this:

```js
import { Settings } from "@frontity/file-settings";

const settings: Settings = { ... };
```

### `Settings<T = Package>`

Types for the imported settings object from the settings file. You'll want to use them on your `frontity.settings.ts` file.

## Index

### References

* [MonoSettings](file_settings.md#monosettings)
* [MultiSettings](file_settings.md#multisettings)
* [NormalizedPackage](file_settings.md#normalizedpackage)
* [NormalizedSettings](file_settings.md#normalizedsettings)
* [Package](file_settings.md#package)
* [Settings](file_settings.md#settings)
* [Site](file_settings.md#site)
* [getAllSites](file_settings.md#getallsites)
* [getSettings](file_settings.md#getsettings)

### Type aliases

* [MonoSettings](file_settings.md#monosettings)
* [MultiSettings](file_settings.md#multisettings)
* [NormalizedPackage](file_settings.md#normalizedpackage)
* [NormalizedSettings](file_settings.md#normalizedsettings)
* [Package](file_settings.md#package)
* [Settings](file_settings.md#settings)
* [Site](file_settings.md#site)

## References

###  MonoSettings

• **MonoSettings**:

___

###  MultiSettings

• **MultiSettings**:

___

###  NormalizedPackage

• **NormalizedPackage**:

___

###  NormalizedSettings

• **NormalizedSettings**:

___

###  Package

• **Package**:

___

###  Settings

• **Settings**:

___

###  Site

• **Site**:

___

###  getAllSites

• **getAllSites**:

___

###  getSettings

• **getSettings**:

## Type aliases

###  MonoSettings

Ƭ **MonoSettings**: *Imported‹T› & Mono*

*Defined in [packages/file-settings/types.ts:36](https://github.com/frontity/frontity/blob/8f93b4e4/packages/file-settings/types.ts#L36)*

___

###  MultiSettings

Ƭ **MultiSettings**: *Imported‹T› & Multi*

*Defined in [packages/file-settings/types.ts:38](https://github.com/frontity/frontity/blob/8f93b4e4/packages/file-settings/types.ts#L38)*

___

###  NormalizedPackage

Ƭ **NormalizedPackage**: *[Package](file_settings.md#package) & object*

*Defined in [packages/file-settings/types.ts:13](https://github.com/frontity/frontity/blob/8f93b4e4/packages/file-settings/types.ts#L13)*

___

###  NormalizedSettings

Ƭ **NormalizedSettings**: *Normalized‹T› & Multi*

*Defined in [packages/file-settings/types.ts:42](https://github.com/frontity/frontity/blob/8f93b4e4/packages/file-settings/types.ts#L42)*

___

###  Package

Ƭ **Package**: *object*

*Defined in [packages/file-settings/types.ts:7](https://github.com/frontity/frontity/blob/8f93b4e4/packages/file-settings/types.ts#L7)*

#### Type declaration:

* **active**? : *boolean*

* **name**: *string*

* **state**? : *object*

___

###  Settings

Ƭ **Settings**: *[MonoSettings](file_settings.md#monosettings)‹T› | [MultiSettings](file_settings.md#multisettings)‹T›[]*

*Defined in [packages/file-settings/types.ts:40](https://github.com/frontity/frontity/blob/8f93b4e4/packages/file-settings/types.ts#L40)*

___

###  Site

Ƭ **Site**: *object*

*Defined in [packages/file-settings/types.ts:44](https://github.com/frontity/frontity/blob/8f93b4e4/packages/file-settings/types.ts#L44)*

#### Type declaration:

* **mode**: *string*

* **name**: *string*

* **packages**: *string[]*
