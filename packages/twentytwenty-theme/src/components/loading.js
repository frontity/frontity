import React from "react";
import { styled, connect, keyframes, css } from "frontity";

const style = (i = 1) => {
  return css`
    position: absolute;
    height: 240px;
    overflow: hidden;
    background-color: #fff;
    background-clip: padding-box;
    display: block;
    border-radius: 2px;
    will-change: left, right;
    animation-fill-mode: forwards;
    animation: ${i === 1 ? long : short} 2.1s ${i === 2 ? "1.15s" : ""}
      ${i === 1
        ? "cubic-bezier(0.65, 0.815, 0.735, 0.395)"
        : "cubic-bezier(0.165, 0.84, 0.44, 1)"}
      infinite;
  `;
};

const long = keyframes`
  0% {left: -35%;right: 100%}
  60% {left: 100%;right: -90%}
  100% {left: 100%;right: -90%}
`;

const short = keyframes`
  0% {left: -200%;right: 100%}
  60% {left: 107%;right: -8%}
  100% {left: 107%;right: -8%}
`;

const wrapper = (width, height, color) => {
  return css`
    position: relative;
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
    background-color: ${color};
    background-clip: padding-box;
  `;
};

const Loading = ({ state }) => (
  <Container>
    <div css={[wrapper(240, 4, state.theme.colors.primary), css]}>
      <div css={style(1)} />
    </div>
  </Container>
);

export default connect(Loading);

const Container = styled.div`
  width: 100%;
  height: 80vh;
  margin: 0;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin-top: 24px;
  }
`;
