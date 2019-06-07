import { Decode } from "../../../types";

const decode: Decode = text => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

export default decode;
