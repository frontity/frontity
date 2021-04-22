import expect from "expect";
import type { taskTypes } from "../../plugins";

const task: taskTypes = cy.task;

describe("AMP", () => {
  before(() => {
    task("loadDatabase", {
      path: "./wp-data/amp/data.sql",
    });
  });

  it("amp-iframe", () => {
    const url = "http://localhost:3001/amp-iframe/?frontity_name=amp-wordpress";

    cy.validateAMP(url);
    cy.visit(url);

    cy.get("amp-iframe").should(
      "have.attr",
      "src",
      "https://mars.frontity.org"
    );
  });

  it("amp-img", () => {
    const url = "http://localhost:3001/amp-img/?frontity_name=amp-wordpress";

    cy.validateAMP(url);
    cy.visit(url);
    cy.get("amp-img > img")
      .should("have.attr", "src")
      .and("contain", "ciudad_perdida");
  });

  it("amp-audio", () => {
    const url = "http://localhost:3001/amp-audio/?frontity_name=amp-wordpress";

    cy.validateAMP(url);
    cy.visit(url);
    cy.get("amp-audio > audio").should((els) => {
      const audio = els[0] as HTMLAudioElement;
      audio.play();

      // You can play the audio element
      expect(audio.duration > 0 && !audio.paused && !audio.muted).toBe(true);

      audio.pause();
    });

    // The placeholder & fallback for the second audio element should exist
    cy.get("#audio-2 amp-audio div[placeholder]").should("exist");
    cy.get("#audio-2 amp-audio div[fallback]").should("exist");

    // Second audio element that we've created in WP on the same page
    cy.get("#audio-2 amp-audio > audio").should((els) => {
      const audio = els[0] as HTMLAudioElement;
      audio.play();

      // You can play the audio element
      expect(audio.duration > 0 && !audio.paused && !audio.muted).toBe(true);

      audio.pause();
    });

    // The src has to be served over HTTPS
    cy.get("#audio-2 amp-audio > audio > source")
      .should("have.attr", "src")
      .and("contain", "https://");
  });

  it("amp-video", () => {
    const url = "http://localhost:3001/amp-video/?frontity_name=amp-wordpress";

    cy.validateAMP(url);
    cy.visit(url);
    cy.get("amp-video > video").should((els) => {
      const video = els[0] as HTMLVideoElement;
      video.play();

      // You can play the video element
      expect(video.duration > 0 && !video.paused && !video.muted).toBe(true);

      video.pause();
    });

    // The placeholder & fallback for the second video element should exist
    cy.get("#video-2 amp-video div[placeholder]").should("exist");
    cy.get("#video-2 amp-video div[fallback]").should("exist");

    // Second video element that we've created in WP on the same page
    cy.get("#video-2 amp-video > video").should((els) => {
      const video = els[0] as HTMLVideoElement;
      video.play();

      // You can play the video element
      expect(video.duration > 0 && !video.paused && !video.muted).toBe(true);

      video.pause();
    });

    // The src has to be served over HTTPS
    cy.get("#video-2 amp-video > video > source")
      .should("have.attr", "src")
      .and("contain", "https://");
  });

  it("amp-twitter", () => {
    const url =
      "http://localhost:3001/amp-twitter/?frontity_name=amp-wordpress";

    cy.validateAMP(url);
    cy.visit(url);

    cy.get("amp-twitter > iframe").should("exist");
  });

  it("amp-youtube", () => {
    const url =
      "http://localhost:3001/amp-youtube/?frontity_name=amp-wordpress";

    cy.validateAMP(url);
    cy.visit(url);

    cy.get("amp-youtube > iframe")
      .should("have.attr", "src")
      .and("contain", "https://www.youtube.com/embed/dQw4w9WgXcQ");
  });

  it("picture tag should render correctly", () => {
    const url = "http://localhost:3001/picture/?frontity_name=amp-wordpress";

    cy.validateAMP(url);
    cy.visit(url);

    cy.get("amp-img > img")
      .should("have.attr", "src")
      .and("contain", "ciudad_perdida");
  });
});
