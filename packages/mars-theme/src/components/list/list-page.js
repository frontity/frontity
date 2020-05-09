import React from "react";
import { connect } from "frontity";
import ListItem from "./list-item";

const ListPage = ({ state, link }) => {
  const data = state.source.get(link);

  return data.items.map(({ type, id }) => (
    <ListItem key={id} item={state.source[type][id]} />
  ));
};

export default connect(ListPage);
