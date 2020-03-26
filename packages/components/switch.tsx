import { connect, warn } from "frontity";
import { Package } from "frontity/types";
import React, { isValidElement, ReactNodeArray } from "react";

const Switch: React.FC<Package> | null = ({ children }) => {
  const components: ReactNodeArray = React.Children.toArray(children);

  // Check if components[] has a non-ReactNode type Element
  const hasInvalidComponent: boolean =
    components.findIndex((component) => !isValidElement(component)) !== -1;

  // last element in components[]
  const lastComponent = components[components.length - 1];

  // Check if last component is default component - No when props
  const lastComponentIsDefault =
    isValidElement(lastComponent) && !("when" in lastComponent.props);

  if (hasInvalidComponent) {
    warn("Children of <Switch /> component should be a type of ReactNode");
  }

  // Filter components by the value of the 'when' props or path
  const filteredComponent = components.find(
    (component) => isValidElement(component) && component.props.when
  );

  // Render filteredComponents
  if (filteredComponent) return <>{filteredComponent}</>;

  // render last component if it's diffult component (without when props);
  if (lastComponentIsDefault) return <>{lastComponent}</>;

  // Return `null` if none of the children have matched.
  return null;
};

export default connect(Switch);
