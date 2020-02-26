import { connect, styled, warn } from "frontity";
import { Package } from "frontity/types";
import React, { isValidElement, ReactNodeArray } from "react";

const description404 = (
  <>
    That page can’t be found{" "}
    <span role="img" aria-label="confused face">
      😕
    </span>
  </>
);

const description = (
  <>
    Don&apos;t panic! Seems like you encountered an error. If this persists,
    <a href="https://community.frontity.org"> let us know </a> or try refreshing
    your browser.
  </>
);

// Default 404 Error Component
const DefaultErrorComponent = ({ state }) => {
  const data = state.source.get(state.router.link);

  const title = "Oops! Something went wrong";
  const title404 = "Oops! 404";

  return (
    <Container>
      <Title>{data.is404 ? title404 : title}</Title>
      <Description>{data.is404 ? description404 : description}</Description>
    </Container>
  );
};

const ErrorComponent = connect(DefaultErrorComponent);

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: rgba(12, 17, 43);
  font-size: 4em;
`;

const Description = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
  margin: 24px 0;
`;

const Switch: React.FC<Package> = ({ children }) => {
  const components: ReactNodeArray = React.Children.toArray(children);

  // Check if components[] has a non-ReactNode type Element
  const hasInvalidComponent: boolean =
    components.findIndex(component => !React.isValidElement(component)) !== -1;

  // last element in components[]
  const lastComponent = components[components.length - 1];

  // Check if last component is default component - No when props
  const lastComponentIsDefault =
    React.isValidElement(lastComponent) && !lastComponent.props.when;

  if (hasInvalidComponent) {
    warn("Children of <Switch /> component should be a type of ReactNode");
  }

  // Filter components by the value of the 'when' props or path
  const filteredComponents = components.filter(
    component => isValidElement(component) && component.props.when
  );

  // Render filteredComponents
  if (filteredComponents.length > 0) {
    return (
      <>{filteredComponents.map(filteredComponent => filteredComponent)}</>
    );
  }

  // render last component if it's diffult component (without when props);
  if (lastComponentIsDefault) {
    return <>{lastComponent}</>;
  }

  // render frontity default 404 component
  return <ErrorComponent />;
};

export default connect(Switch);
