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

Some [TS types](src/types.ts) are exposed to be used in development. They can be accessed like this:

```js
import { Settings } from "@frontity/file-settings";

const settings: Settings = { ... };
```

The following are probably the only type you will need during development:

### `Settings<T = Package>`

Types for the imported settings object from the settings file. You'll want to use them on your `frontity.settings.ts` file.
