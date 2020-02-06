import React from "react";
import Script from "@frontity/components/script";
import Package from "../types";

const Component: React.FC = () => (
  <>
    <p data-test-id="target">OFF</p>
    <button data-test-id="toggle">Toggle</button>

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
