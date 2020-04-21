function containsHTMLEntities(text: string) {
  return /&(#(([0-9]+)|x([a-fA-F0-9]+))|[a-zA-Z]+)(;|\s)/.test(text);
}

export default containsHTMLEntities;
