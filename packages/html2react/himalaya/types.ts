export interface Element {
  type: "element";
  tagName: string;
  children: Node[];
  attributes: Attribute[];
}

export interface Comment {
  type: "comment";
  content: string;
}

export interface Text {
  type: "text";
  content: string;
}

export type Attribute = { key: string; value?: string };

export type Node = Element | Comment | Text;
