export interface HimalayaElement {
  type: "element";
  tagName: string;
  children: HimalayaNode[];
  attributes: HimalayaAttribute[];
}

export interface HimalayaComment {
  type: "comment";
  content: string;
}

export interface HimalayaText {
  type: "text";
  content: string;
}

export type HimalayaAttribute = { key: string; value?: string };

export type HimalayaNode = HimalayaElement | HimalayaComment | HimalayaText;
