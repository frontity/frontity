import he from "he";
import { Decode } from "../../types";
import simpleDecode from "simple-entity-decode";
import containsHTMLEntities from "./containsHTMLEntities";

const decode: Decode = text => {
  // If we are free of HTML entities, just return the text
  if (!containsHTMLEntities(text)) {
    return text;
  }

  // simpleDecode only decodes the most common entities
  // We check if it escaped all possible entities and if not,
  // we fall back on full decoding
  const decodedText = simpleDecode(text);
  if (!containsHTMLEntities(decodedText)) {
    return decodedText;
  }

  return he.decode(text);
};

export default decode;
