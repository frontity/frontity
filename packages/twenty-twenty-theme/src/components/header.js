import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Navigation from "./navigation";
import MobileMenu from "./menu";

const Header = ({ state }) => {
  const { title, description } = state.frontity;
  return (
    <PageHeader>
      <PageHeaderInner>
        <SiteTitle>
          <StyledLink link="/">{title}</StyledLink>
        </SiteTitle>
        <SiteDescription>{description}</SiteDescription>
        <MobileMenu />
      </PageHeaderInner>
      <Navigation />
    </PageHeader>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const PageHeader = styled.header`
  z-index: 1;
  background: #fff;
  position: relative;
`;

const PageHeaderInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 2.8rem 0;
  max-width: 168rem;
  z-index: 100;
  margin-left: auto;
  margin-right: auto;
`;

const SiteTitle = styled.h1`
  line-height: 1;
  font-size: 2.4rem;
  font-weight: 700;
  @media (min-width: 1000px) {
    margin: 1rem 0 0 2.4rem;
  }
  @media (min-width: 700px) {
    font-size: 2.4rem;
    font-weight: 700;
  }
`;

const SiteDescription = styled.div`
  color: #6d6d6d;
  font-size: 1.8rem;
  font-weight: 500;
  display: none;
  letter-spacing: -0.0311em;
  transition: all 0.15s linear;

  @media (min-width: 1000px) {
    margin: 1rem 0 0 2.4rem;
  }

  @media (min-width: 700px) {
    display: block;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;
