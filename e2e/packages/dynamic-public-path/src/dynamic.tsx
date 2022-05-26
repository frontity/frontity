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

  const styles = css`
    background-image: url(${image});
  `;

  console.log("styles:", styles);

  return (
    <>
      <img alt="test" data-test-id="image-2" src={image} />
      <div css={styles} />
      <div data-test-id="dynamic-div">I am the Dynamic component</div>
      <button data-test-id="toggle-button" onClick={() => setToggle(!toggle)}>
        Toggle
      </button>
      <div data-test-id="toggle-div">{toggle ? "ON" : "OFF"}</div>
    </>
  );
};

export default Dynamic;
