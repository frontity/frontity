import Type from "../../type";
import ExtensionExample2 from "./";

const beforeSSR: Type["actions"]["theme"]["beforeSSR"] = state => {
  state.theme.prop1 = 2;
};

ExtensionExample2.actions.theme.beforeSSR = beforeSSR;

export default ExtensionExample2;
