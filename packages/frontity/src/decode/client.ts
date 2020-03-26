import { Decode } from "../../types";
import simpleDecode from "simple-entity-decode";
import containsHTMLEntities from "./containsHTMLEntities";

const decode: Decode = (text) => {
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

  // We find all the leading whitespace
  const whitespaceMatch = text.match(/^[ \t]+/);
  const whitespace = whitespaceMatch ? whitespaceMatch[0] : "";
  const doc = new DOMParser().parseFromString(text, "text/html");

  // We restore the whitespace in the result, because DOMParser will strip it out
  return whitespace + doc.documentElement.textContent;
};

export default decode;
