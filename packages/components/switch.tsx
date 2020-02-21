import React, { ReactNode, ReactNodeArray, isValidElement } from "react";
import { connect } from "frontity";
import { Connect, Package } from "frontity/types";
import { warn } from "@frontity/error";

type SwitchComponent = React.FC<
  Connect<
    Package,
    {
      children?: ReactNode;
      when?: boolean;
      path?: string;
    }
  >
>;

// Default Frontity 404 Error Component
const DefaultErrorComponent = () => (
  <div>
    <h1>404!!</h1>
    <p>Route does not exist</p>
  </div>
);

const Switch: SwitchComponent = ({ state, children }) => {
  // Current Path
  const currentPath = state.router.link;
  // Array of components
  const components: ReactNodeArray = React.Children.toArray(children);

  // Warn if any node is not an instace of React Node
  if (components.find(component => !isValidElement(component))) {
    warn("WIP: Child of <Switch /> component should be of type ReactNode");
  }

  // last component
  const lastComponent = components[components.length - 1];

  //  Check if path matches currentPath
  const pathIsAMatch = ({ path }) => path && path === currentPath;

  // Check if a 404 error component exist
  // 404 component should not have a 'when'
  const hasNotFoundComponent =
    isValidElement(lastComponent) && !lastComponent.props.when;

  // Filter components by the value of the 'when' props or path
  const filteredComponents = components.filter(
    component =>
      isValidElement(component) &&
      (component.props.when || pathIsAMatch(component.props))
  );

  // Iterate and render filtered components if 1 or more components exists
  if (filteredComponents.length > 0) {
    return (
      <>{filteredComponents.map(filteredComponent => filteredComponent)}</>
    );
  }

  // return lastComponents if 404 component
  if (hasNotFoundComponent) {
    return <>{lastComponent}</>;
  }

  // Return frontity default 404 page
  return <DefaultErrorComponent />;
};

export default connect(Switch);
