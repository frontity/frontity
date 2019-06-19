import he from "he";
import { Decode } from "../../../types";

const decode: Decode = text => he.decode(text);

export default decode;
