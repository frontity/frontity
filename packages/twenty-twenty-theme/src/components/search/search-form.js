import { connect, styled } from "frontity";
import React, { useRef } from "react";
import ScreenReaderText from "../screen-reader";

const SearchForm = ({ state, actions, libraries }) => {
  const parse = libraries.source.parse(state.router.link);
  const searchQuery = parse.query["s"];

  const { closeSearchModal } = actions.theme;
  // Keep a reference to the input so we can grab it's value on form submission
  const inputRef = useRef();

  const handleSubmit = event => {
    // Prevent page navigation
    event.preventDefault();

    // Get the input's value
    const searchString = inputRef.current.value;

    // If the typed search string is not empty
    // Better to trim write spaces as well
    if (searchString.trim().length > 0) {
      // Let's go search for blogs that match the search string
      actions.router.set(`/?s=${searchString.toLowerCase()}`);

      // Scroll the page to the top
      window.scrollTo(0, 0);

      // Close the search modal
      closeSearchModal();
    }
  };

  return (
    <Form role="search" aria-label="404 not found" onSubmit={handleSubmit}>
      <Label>
        <ScreenReaderText>Search for:</ScreenReaderText>
        <Input
          type="search"
          defaultValue={searchQuery}
          placeholder="Search ..."
          ref={inputRef}
        />
      </Label>
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default connect(SearchForm);

const Form = styled.form`
  align-items: stretch;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0 -0.8rem -0.8rem;
  justify-content: center;
  margin-top: 3rem;
`;

const Label = styled.label`
  align-items: stretch;
  display: flex;
  font-size: inherit;
  margin: 0;
  width: 100%;
`;

const Input = styled.input`
  background: #fff;
  border-radius: 0;
  border-style: solid;
  border-color: #dcd7ca;
  border-width: 0.1rem;
  box-shadow: none;
  display: block;
  font-size: 1.6rem;
  letter-spacing: -0.015em;
  max-width: 100%;
  padding: 1.5rem 1.8rem;
  width: 100%;
  margin: 0 0 0.8rem 0.8rem;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

const Button = styled.button`
  flex-shrink: 0;
  background-color: #cd2653;
  font-size: 1.7rem;
  border: none;
  border-radius: 0;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  letter-spacing: 0.0333em;
  line-height: 1.25;
  opacity: 1;
  padding: 1.1em 1.44em;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: opacity 0.15s linear;
  margin: 0 0 0.8rem 0.8rem;
`;
