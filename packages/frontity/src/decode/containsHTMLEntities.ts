function containsHTMLEntities(text: string) {
  return /&[a-zA-Z]+(;|\s)/.test(text);
}

export default containsHTMLEntities;
