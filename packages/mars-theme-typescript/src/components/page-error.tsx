import { styled } from "frontity";
import { ErrorData } from "@frontity/source/types";

/**
 * The props of the {@link PageError} component.
 */
interface PageErrorProps {
  /**
   * The data stored in the state for this URL.
   */
  data: ErrorData;

  /**
   * Whether or not to render this component. Used by the `<Switch>` component.
   */
  when?: boolean;
}

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

/**
 * The Error page component. It shows either a 404 page if the error is a 404
 * or a generic error if it's a different one.
 *
 * @param props - The props, defined in {@link PageErrorProps}.
 * @returns The error screen.
 */
const PageError = ({ data }: PageErrorProps): JSX.Element => {
  const title = "Oops! Something went wrong";
  const title404 = "Oops! 404";

  return (
    <Container>
      <Title>{data.is404 ? title404 : title}</Title>
      <Description>{data.is404 ? description404 : description}</Description>
    </Container>
  );
};

export default PageError;

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
