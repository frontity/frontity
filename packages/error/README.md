# `@frontity/error`

The Frontity warnings and errors.

This is somewhat modified from https://github.com/alexreardon/tiny-invariant and with added typescript.

## Usage

```
import { warn, error }  from '@frontity/error';

error(someCondition, "The condition `someCondition` has failed!")

warn("This should never happen! 😜")

```
