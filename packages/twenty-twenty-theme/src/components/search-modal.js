import { styled, connect } from "frontity";
import React, { useEffect, useRef } from "react";
import { CloseIcon } from "./icons";
import ScreenReaderText from "./screen-reader";

const SearchModal = ({ state, actions }) => {
  const { isSearchModalOpen } = state.theme;
  const { performSearch, closeSearchModal } = actions.theme;

  // Keep a reference to the input so we can grab it's value on form submission
  const inputRef = useRef();

  // Keep a reference to the previously active element
  // to restore focus back
  const activeElementRef = useRef();

  // Accessibility: focus on the input if the modal is open
  useEffect(() => {
    if (isSearchModalOpen && inputRef.current) {
      activeElementRef.current = document.activeElement;
      inputRef.current.focus();
    } else {
      if (activeElementRef.current) {
        activeElementRef.current.focus();
      }
    }
  }, [isSearchModalOpen]);

  const handleSubmit = event => {
    // Prevent page navigation
    event.preventDefault();

    // Get the input's value
    const searchString = inputRef.current.value;

    // If the typed search string is not empty
    // Better to trim write spaces as well
    if (searchString.trim().length > 0) {
      // Let's go search for blogs that match the search string
      performSearch(searchString);
    }
  };

  const handleClick = () => {
    closeSearchModal();
  };

  return (
    <ModalOverlay data-open={isSearchModalOpen} onClick={handleClick}>
      <ModalInner
        onClick={event => {
          // prevent clicks within the content from propagating to the ModalOverlay
          event.stopPropagation();
        }}
      >
        <SectionInner>
          <SearchForm
            role="search"
            aria-label="Search for:"
            onSubmit={handleSubmit}
          >
            <SearchInput
              ref={inputRef}
              type="search"
              placeholder="search for:"
              name="search"
            />
          </SearchForm>

          <CloseButton onClick={closeSearchModal}>
            <ScreenReaderText>Close search</ScreenReaderText>
            <CloseIcon />
          </CloseButton>
        </SectionInner>
      </ModalInner>
    </ModalOverlay>
  );
};

export default connect(SearchModal);

const ModalOverlay = styled.div`
  background: rgba(0, 0, 0, 0.2);
  display: none;
  opacity: 0;
  position: fixed;
  bottom: 0;
  left: -9999rem;
  top: 0;
  transition: opacity 0.2s linear, left 0s 0.2s linear;
  width: 100%;
  z-index: 999;

  &[data-open="true"] {
    display: block;
    cursor: pointer;
    opacity: 1;
    left: 0;
  }
`;

const ModalInner = styled.div`
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.08);
  transform: translateY(0);
  background: #fff;
  transition: transform 0.25s ease-in-out, box-shadow 0.1s 0.25s linear;
`;

const SectionInner = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 120rem;
  width: calc(100% - 4rem);
  display: flex;
  justify-content: space-between;
  max-width: 168rem;

  @media (min-width: 700px) {
    width: calc(100% - 8rem);
  }
`;

const SearchForm = styled.form`
  margin: 0;
  position: relative;
  width: 100%;
  align-items: stretch;
  display: flex;
  flex-wrap: nowrap;

  @media (min-width: 700px) {
    position: relative;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  border-radius: 0;
  color: inherit;
  display: block;
  font-size: 2rem;
  letter-spacing: -0.0277em;
  height: 8.4rem;
  margin: 0 0 0 -2rem;
  max-width: calc(100% + 2rem);
  padding: 0 0 0 2rem;
  width: calc(100% + 2rem);

  @media (min-width: 700px) {
    border: none;
    font-size: 3.2rem;
    height: 14rem;
  }

  &:focus {
    outline: thin dotted;
    outline-offset: -4px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  box-shadow: none;
  border-radius: 0;
  font-size: inherit;
  font-weight: 400;
  letter-spacing: inherit;
  padding: 0;
  text-transform: none;

  color: #000000;
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  margin-right: -2.5rem;
  padding: 0 2.5rem;

  &:hover {
    svg {
      transform: scale(1.3);
    }
  }

  svg {
    height: 1.5rem;
    transition: transform 0.15s ease-in-out;
    width: 1.5rem;

    @media (min-width: 700px) {
      height: 2.5rem;
      width: 2.5rem;
    }
  }
`;
