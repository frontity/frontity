import { Package } from "frontity/types";

interface Switch extends Package {
  name: "switch";
  state: {};
  actions: {};
  roots: {
    switch: React.ReactType;
  };
  libraries: {};
}

export default Switch;
