import { Package } from "frontity/types";

interface Emotion extends Package {
  name: "emotion";
  state: {};
  actions: {};
  roots: {
    emotion: React.ReactType;
  };
  libraries: {};
}

export default Emotion;
