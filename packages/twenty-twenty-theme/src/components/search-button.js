import { styled, connect } from "frontity";
import React from "react";
import { SearchIcon } from "./icons";

const SearchButton = ({ state, actions }) => {
  // Get the state of the search modal
  const { isSearchModalOpen } = state.theme;
  const { openSearchModal } = actions.theme;

  return (
    <HeaderToggle>
      <ToggleWrapper>
        <SearchToggle
          aria-expanded={isSearchModalOpen}
          onClick={openSearchModal}
          aria-label="Click to open search bar..."
        >
          <ToggleInner>
            <SearchIcon />
            <ToggleText>Search</ToggleText>
          </ToggleInner>
        </SearchToggle>
      </ToggleWrapper>
    </HeaderToggle>
  );
};

export default connect(SearchButton);

const HeaderToggle = styled.div`
  display: none;

  @media (min-width: 1000px) {
    display: flex;
    flex-shrink: 0;
    margin-right: -3rem;
  }

  @media (min-width: 1220px) {
    margin-right: -4rem;
    margin-left: 4rem;
  }
`;

const ToggleWrapper = styled.div`
  @media (min-width: 1000px) {
    position: relative;
  }

  &:before {
    background-color: #dcd7ca;

    @media (min-width: 1000px) {
      background: #dedfdf;
      content: "";
      display: block;
      height: 2.7rem;
      position: absolute;
      left: 0;
      top: calc(50% - 1.35rem);
      width: 0.1rem;
    }
  }

  &:first-child::before {
    @media (min-width: 1000px) {
      content: none;
    }
  }

  &:first-child::before {
    @media (min-width: 1000px) {
      content: "";
    }
  }
`;

const SearchToggle = styled.button`
  appearance: none;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  position: relative;
  text-align: inherit;
  user-select: none;
  background: none;
  border: none;
  box-shadow: none;
  border-radius: 0;
  font-size: inherit;
  font-weight: 400;
  letter-spacing: inherit;
  padding: 0;
  text-transform: none;
  align-items: center;
  display: flex;
  overflow: visible;
  padding: 0 2rem;
  color: #000000;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 1000px) {
    height: 4.4rem;
    padding: 0 3rem;
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
    top: auto;
    width: auto;
  }

  @media (min-width: 1220px) {
    padding: 0 4rem;
  }
`;

const ToggleInner = styled.span`
  display: flex;
  justify-content: center;
  height: 2.3rem;
  position: relative;

  @media (min-width: 1000px) {
    position: static;
  }

  svg {
    height: 2.5rem;
    max-width: 2.3rem;
    width: 2.3rem;
    display: block;
    position: relative;
    z-index: 1;
  }
`;

const ToggleText = styled.span`
  color: #6d6d6d;
  font-size: 1rem;
  font-weight: 600;
  position: absolute;
  top: calc(100% + 0.5rem);
  width: auto;
  white-space: nowrap;
  word-break: break-all;

  @media (min-width: 700px) {
    font-size: 1.2rem;
  }

  @media (min-width: 1000px) {
    left: 0;
    right: 0;
    text-align: center;
    top: calc(100% - 0.3rem);
    width: auto;
  }
`;
