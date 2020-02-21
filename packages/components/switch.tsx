import React, { ReactElement, ReactNode } from "react";
import { connect } from "frontity";
import { Connect, Package } from "frontity/types";

type SwitchChild = React.FC<Connect<Package, { children?: ReactNode }>>;

const DefaultErrorComponent = () => (
  <div>
    <h1>404!!</h1>
    <p>Route does not exist</p>
  </div>
);

const Switch: SwitchChild = ({ state, children }) => {
  // Current Path
  const currentPath = state.router.link;
  // Array of components
  const components: Array<ReactNode | null> = React.Children.toArray(children);
  // last component
  const lastComponent: ReactElement | any = components[components.length - 1];

  //  Check if path matches currentPath
  const pathIsAMatch = ({ path }) => path && path === currentPath;

  // Check if a 404 error component exist
  // 404 component should not have a 'when' or 'path' prop;
  const hasNotFoundComponent =
    !lastComponent || !lastComponent.props.when || !lastComponent.props.path;

  // Filter components by the value of the 'when' props or path
  const filteredComponents = components.filter(
    (component: ReactElement) =>
      component.props && (component.props.when || pathIsAMatch(component.props))
  );

  // Iterate and render filtered components if 1 or more components exists
  if (filteredComponents.length > 0) {
    return filteredComponents.map(filteredComponent => {
      return filteredComponent;
    });
  }

  // return lastComponents if 404 component
  if (hasNotFoundComponent) {
    return lastComponent;
  }

  // Return frontity default 404 page
  return <DefaultErrorComponent />;
};

export default connect(Switch);
