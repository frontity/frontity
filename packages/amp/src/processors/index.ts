import { img } from "./img";
import { iframe } from "./iframe";
import { video } from "./video";
import { audio } from "./audio";
import { removeProhibitedTags } from "./removeProhibitedTags";
import { removeProhibitedClassNames } from "./removeProhibitedClassNames";
import { removeProhibitedIds } from "./removeProhibitedIds";
import { twitter } from "./twitter";
import { youtube } from "./youtube";
import { picture } from "./picture";

export default [
  img,
  picture,
  iframe,
  video,
  audio,
  removeProhibitedTags,
  removeProhibitedClassNames,
  removeProhibitedIds,
  twitter,
  youtube,
];
