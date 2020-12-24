import React from "react";
import { Head, connect, useConnect } from "frontity";
import { Packages } from "../types";

const Script: React.FC = () => {
  const { state } = useConnect<Packages>();
  const { name } = state.frontity;

  const googleAnalyticsScript = `
      window.oldGa = window.ga || function() {};
      window.gaCalls = [];
      Object.defineProperty(window, "ga", {
        get: function() {
          return function () {
            window.gaCalls.push(arguments);
            window.oldGa.apply(window, arguments);
          }
        },
        set: function(value) {
          window.oldGa = value;
        }
      });
  `;

  const comscoreScript = `
    window.oldComscoreBeacon = window.COMSCORE ? window.COMSCORE.beacon : function() {};
    window.comscoreCalls = [];
    Object.defineProperty(window, "COMSCORE", {
      get: function() {
        return { beacon: function () {
          console.log(c1);
          window.comscoreCalls.push(arguments);
          window.oldComscoreBeacon.apply(window.COMSCORE, arguments);
        }};
      },
      set: function(value) {
        window.oldComscoreBeacon = value.beacon;
      }
    });
`;

  let script;
  switch (name) {
    case "google-analytics":
      script = googleAnalyticsScript;
      break;
    case "comscore-analytics":
      script = comscoreScript;
      break;
  }

  return (
    <Head>
      <script>{script}</script>
    </Head>
  );
};

export default connect(Script);
