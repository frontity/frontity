import Yoast from "../types";
import state from "./state";
import Component from "./components";

const yoast = (): Yoast => ({
  name: "@frontity/yoast",
  roots: { yoast: Component },
  state: { yoast: state }
});

export default yoast;
