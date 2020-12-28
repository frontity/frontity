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
    window.COMSCORE = window.COMSCORE || {};
    window.oldComscoreBeacon = window.COMSCORE.beacon || function() {};
    window.comscoreCalls = [];
    Object.defineProperty(window.COMSCORE, "beacon", {
      get: function() {
        return function () {
          window.comscoreCalls.push({ 
            title: document.title,
            link: window.location.href,
            id: arguments[0].c2
          });
          window.oldComscoreBeacon.apply(window.COMSCORE, arguments);
        };
      },
      set: function(value) {
        window.oldComscoreBeacon = value;
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
