import { useState } from "react";
import { css } from "frontity";
import image from "./image.png";

/**
 * A React component that renders a dynamic component.
 *
 * @returns React element.
 */
const Dynamic: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  const divStyles = css`
    background-image: url(${image});
    height: 200px;
    width: 200px;
  `;

  const buttonStyles = css`
    font-size: 16px;
    border: 2px solid black;
    background: none;
  `;

  console.log("styles:", divStyles);
  console.log("buttonStyles:", buttonStyles);

  return (
    <>
      <img alt="test" data-test-id="image-2" src={image} />
      <div css={divStyles} />
      <div data-test-id="dynamic-div">I am the Dynamic component</div>
      <button
        css={buttonStyles}
        data-test-id="toggle-button"
        onClick={() => setToggle(!toggle)}
      >
        Toggle
      </button>
      <div data-test-id="toggle-div">{toggle ? "ON" : "OFF"}</div>
    </>
  );
};

export default Dynamic;
