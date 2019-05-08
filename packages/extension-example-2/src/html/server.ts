import ExtensionExample2 from "./";

ExtensionExample2.actions.theme.beforeSSR = state => {
  state.theme.prop1 = 2;
};

export default ExtensionExample2;
