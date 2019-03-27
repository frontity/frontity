# File Settings

This package is used to import the Frontity settings from a local file.

## Usage

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

Used to retrieve the settings from the `frontity.settings.ts` file.

#### Parameters

**`options`** : `{ name?: string; url: string; }`

Used to match the right set of settings when there is more than one.

- **`options.name`** : `string`\
  The name of the set of settings you want to retrieve. When provided, `getSettings` will forget about using `options.url`.

- **`options.url`** : `string`\
  The url of the site using Frontity. The `matches` field of each set of settings will be tested against this url to determine which set of settings should be used.

#### Return

**`settings`** : `Settings`\
An object with type `Settings` containing a set of settings.

### `async getPackages() => packages`

Used to retrieve a list of names of the packages used in each settings set.

#### Return

**`packages`** : `{ [key: string]: string[] }`\
An object with a key for each set of settings populated with an array of packages names from that set.

If the settings file exports only one set of settings (or _mono settings_), `packages` will have only one key named `default`:

```js
{
 default: [ "theme-package", "source-package" ]
}
```

If the settings file exports various sets of settings (or _multi settings_), `packages` will have one key per set of settings named like them.

```js
{
  "settings-one": [ "theme-one", "source-one" ],
  "settings-two": [ "theme-two", "source-one" ]
}
```

## Settings File

The file must be located in the root directory of the project, it must be named `frontity.settings.ts` or `frontity.settings.js`, and it needs to export an serializable object.

The settings exported can be **mono settings**:

```ts
{
  name?: string;
  matches?: string[];
  mode?: string; // Default: "html"
  settings?: {
    url?: string;
    title?: string;
    timezone?: number; // Default: 0
    language?: string; // Default; "en"
  },
  packages: [
    string,
    {
      name: string;
      active?: boolean; // Default: true
      namespaces?: string[];
      settings?: object;
    }
  ]
}
```

Or **multi settings**:

```ts
// An array of more than one set of settings.
[
  {
    name: string; // This time the name is mandatory and must be unique.
    matches?: string[];
    mode?: string; // Default: "html"
    settings?: { ... },
    packages: [ ... ]
  },
  {
    name: string; // This time the name is mandatory and must be unique.
    matches?: string[];
    mode?: string; // Default: "html"
    settings?: { ... },
    packages: [ ... ]
  }
]
```

## Types

Some [TS types](src/types.ts) are exposed to be used in development. They can be accessed like this:

```js
import { types } from "@frontity/file-settings";

const settings: types.ImportedSettings = { ... };
```

The following are probably the only types you might need during development:

### `ImportedSettings<T = Package>`

Types for the imported settings object from the settings file. You'll want to use them on your `frontity.settings.ts` file.

### `Settings<T = Package>`

Types for the settings object after it has been merged with the default settings and normalized.

### `Package`

Types for each package within a settings object.
