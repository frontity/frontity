import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";

/**
  * <Header> is the component displayed at the top of the page
  * It contains the title and the menu

  * @param  props
  * @param  props.state - Frontity state
  */

const Header = ({ state }) => {
  return (
    <>
      <Container>
        <StyledLink link="/">
          <Title>{state.frontity.title}</Title>
        </StyledLink>
        <Description>{state.frontity.description}</Description>
        <MobileMenu />
      </Container>
      <Nav />
    </>
  );
};

// Connect the Header component to get access to the `state` via `props`
export default connect(Header);

// <Container> styled component
const Container = styled.div`
  width: 848px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

/**
  * <Title> styled component
  * @example <Title>Title of the Page</Title>
  */

const Title = styled.h2`
  margin: 0;
  margin-bottom: 16px;
`;

// <Description> styled component
const Description = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;

// <StyledLink> styled component
const StyledLink = styled(Link)`
  text-decoration: none;
`;
