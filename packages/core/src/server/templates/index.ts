import html from "./html";
import amp from "./amp";
import { Template } from "../../../types";

export default ({ mode }: { mode: string }): Template =>
  mode === "amp" ? amp : html;
