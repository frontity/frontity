import React from "react";
import Script from "@frontity/components/script";
import Package from "../types";

/**
 * A React component that loads two scripts, one from an external source, and
 * another that contains some code.
 *
 * It renders a third one which its code returns a value, to check that it's not
 * returned in the `useEffect` hook, see [this
 * bug](https://github.com/frontity/frontity/issues/592).
 *
 * @returns React element.
 */
const Component: React.FC = () => {
  const [isScriptActive, setIsScriptActive] = React.useState(true);

  return (
    <>
      <p data-test-id="target">OFF</p>
      <button data-test-id="toggle">Toggle</button>
      <button
        data-test-id="unmount-script"
        onClick={() => setIsScriptActive(false)}
      >
        Unmount script
      </button>

      <Script
        id="from-src"
        src="https://unpkg.com/moment@2.24.0/min/moment.min.js"
      />
      <Script
        id="from-children"
        code={`
          const button = document.querySelector("[data-test-id='toggle']");
          const target = document.querySelector("[data-test-id='target']");
          
          button.addEventListener('click', () => {
            target.innerHTML = 'ON';
          });
        `}
      />
      {isScriptActive && <Script code={"2 + 2"} />}
    </>
  );
};

const ScriptPackage: Package = {
  roots: {
    script: Component,
  },
};

export default ScriptPackage;
