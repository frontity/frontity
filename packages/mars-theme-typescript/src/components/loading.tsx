import { styled, keyframes, css } from "frontity";

/**
 * The props of the {@link Loading} component.
 */
interface LoadingProps {
  /**
   * When this component should be loaded. Used by the `<Switch>` component.
   */
  when?: boolean;
}

const scale = keyframes`
  0% {transform: scaley(1.0)}
  50% {transform: scaley(0.4)}
  100% {transform: scaley(1.0)}
`;

/**
 * Shows a loader. Useful to indicate the user that something is loading.
 *
 * @param _props - Defined in {@link LoadingProps}.
 * @returns The loading animation.
 */
const Loading = (_props: LoadingProps): JSX.Element => (
  <Container>
    <div>
      <div css={bar(1)} />
      <div css={bar(2)} />
      <div css={bar(3)} />
      <div css={bar(4)} />
      <div css={bar(5)} />
    </div>
  </Container>
);

export default Loading;

/**
 * Returns the CSS required for each of the bars.
 *
 * @param index - The position of the bar.
 * @returns A css style.
 */
const bar = (index: number) => css`
  background-color: rgba(12, 17, 43, 0.3);
  width: 4px;
  height: 24px;
  margin: 3px;
  border-radius: 0;
  display: inline-block;
  animation: ${scale} 1s ${index * 0.1}s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation-fill-mode: both;
`;

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin-top: 24px;
  }
`;
