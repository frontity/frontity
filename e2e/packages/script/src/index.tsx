import React from "react";
import Script from "@frontity/components/script";
import Package from "../types";

const Component: React.FC = () => (
  <>
    <p data-test-id="target">OFF</p>
    <button data-test-id="toggle">Toggle</button>

    <Script data-test-id="from-src" src="/link-to-script.js" />
    <Script
      data-test-id="from-children"
      code={`
      const button = document.querySelector("[data-test-id='toggle']");
      const target = document.querySelector("[data-test-id='target']")
      
      button.addEventListener('click', e => {
          e.preventDefault();
          target.innerHTML = 'ON';
      });
    `}
    />
  </>
);

const ScriptPackage: Package = {
  name: "script",
  state: {},
  actions: {},
  roots: {
    script: Component
  },
  libraries: {}
};

export default ScriptPackage;
