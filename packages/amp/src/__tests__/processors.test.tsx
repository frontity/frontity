import Html2React from "@frontity/html2react/src/libraries/component";
import { HelmetProvider } from "frontity";
import { amp, toBeValidAmpHtml } from "./__utilities__/amp-validator";
import { FilledContext, HelmetData } from "react-helmet-async";

import processors from "../processors";
import { render } from "@testing-library/react";

expect.extend({ toBeValidAmpHtml });

// Need to set that flag when testing with jest
// https://github.com/staylor/react-helmet-async#usage-in-jest
HelmetProvider.canUseDOM = false;

const replaceHeadAttributes = (head: HelmetData) => head.script.toString();

test("Validate amp-img", async () => {
  const { container } = render(
    <Html2React
      html="<img src='test.img' width='300' height='300'></img>"
      processors={processors}
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <amp-img
      height="300"
      layout="responsive"
      src="test.img"
      width="300"
    />
  `);
  expect(await amp(container.innerHTML)).toBeValidAmpHtml();
});

test("Validate amp-iframe", async () => {
  const helmetContext = {};

  const { container } = render(
    <HelmetProvider context={helmetContext}>
      <Html2React
        html="<iframe src='test.html' width='auto' height='300'/>"
        processors={processors}
      />
    </HelmetProvider>
  );

  const head = (helmetContext as FilledContext).helmet;

  expect(head.script.toString()).toMatchInlineSnapshot(
    `"<script data-rh=\\"true\\" async custom-element=\\"amp-iframe\\" src=\\"https://cdn.ampproject.org/v0/amp-iframe-0.1.js\\"></script>"`
  );
  expect(container.firstChild).toMatchInlineSnapshot(`
    <amp-iframe
      height="300"
      layout="fixed-height"
      src="test.html"
      title=""
      width="auto"
    />
  `);

  // We replace the `async="true"` with just `async`
  const headScript = replaceHeadAttributes(head);
  expect(await amp(container.innerHTML, headScript)).toBeValidAmpHtml();
});

test("Validate amp-video", async () => {
  const helmetContext = {};

  const { container } = render(
    <HelmetProvider context={helmetContext}>
      <Html2React
        html="<video width='250' height='150' src='video.mp4'></video>"
        processors={processors}
      />
    </HelmetProvider>
  );

  const head = (helmetContext as FilledContext).helmet;

  expect(head.script.toString()).toMatchInlineSnapshot(
    `"<script data-rh=\\"true\\" async custom-element=\\"amp-video\\" src=\\"https://cdn.ampproject.org/v0/amp-video-0.1.js\\"></script>"`
  );
  expect(container.firstChild).toMatchInlineSnapshot(`
    <amp-video
      height="250"
      layout="responsive"
      src="video.mp4"
      width="250"
    />
  `);

  // We replace the `async="true"` with just `async`
  const headScript = replaceHeadAttributes(head);
  expect(await amp(container.innerHTML, headScript)).toBeValidAmpHtml();
});

test("Validate amp-audio", async () => {
  const helmetContext = {};

  const { container } = render(
    <HelmetProvider context={helmetContext}>
      <Html2React
        html="<audio src='audio.mp3'></video>"
        processors={processors}
      />
    </HelmetProvider>
  );

  const head = (helmetContext as FilledContext).helmet;

  expect(head.script.toString()).toMatchInlineSnapshot(
    `"<script data-rh=\\"true\\" async custom-element=\\"amp-audio\\" src=\\"https://cdn.ampproject.org/v0/amp-audio-0.1.js\\"></script>"`
  );
  expect(container.firstChild).toMatchInlineSnapshot(`
    <amp-audio
      controls="true"
      src="audio.mp3"
    />
  `);

  // We replace the `async="true"` with just `async`
  const headScript = replaceHeadAttributes(head);
  expect(await amp(container.innerHTML, headScript)).toBeValidAmpHtml();
});

test("<script /> elements should be removed", async () => {
  const { container } = render(
    <Html2React
      html="<div><script src='test.js'></script></div>"
      processors={processors}
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`<div />`);
  expect(await amp(container.innerHTML)).toBeValidAmpHtml();
});

test("Elements with prohibited class names should be removed", async () => {
  const { container } = render(
    <Html2React
      html="
      <div>
        <div class='other -amp-test this-amp-is-allowed'></div>
        <div class='other i-amp-test -this-i-amp-is-also-allowed'></div>
      </div>"
      processors={processors}
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div
        class="other this-amp-is-allowed"
      />
      <div
        class="other -this-i-amp-is-also-allowed"
      />
    </div>
  `);
  expect(await amp(container.innerHTML)).toBeValidAmpHtml();
});

test("Elements with prohibited ID values should be removed", async () => {
  const { container } = render(
    <Html2React
      html="
      <div>
        <div id='-amp-test' class='test1'></div>
        <div id='i-amp-test' class='test2'></div>
      </div>"
      processors={processors}
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div
        class="test1"
      />
      <div
        class="test2"
      />
    </div>
  `);
  expect(await amp(container.innerHTML)).toBeValidAmpHtml();
});

test("Validate amp-twitter", async () => {
  const { container } = render(<Html2React html="" processors={processors} />);

  expect(container.firstChild).toMatchInlineSnapshot(`null`);
  expect(await amp(container.innerHTML)).toBeValidAmpHtml();
});

test("Adding 2 iframes should result in adding only 1 amp-iframe AMP script in the <head />", async () => {
  const helmetContext = {};

  const { container } = render(
    <HelmetProvider context={helmetContext}>
      <Html2React
        html="<iframe src='a.html' width='auto' height='5'/><iframe src='a.html' width='auto' height='5'/>"
        processors={processors}
      />
    </HelmetProvider>
  );

  const head = (helmetContext as FilledContext).helmet;

  expect(head.script.toString()).toMatchInlineSnapshot(
    `"<script data-rh=\\"true\\" async custom-element=\\"amp-iframe\\" src=\\"https://cdn.ampproject.org/v0/amp-iframe-0.1.js\\"></script>"`
  );

  // We replace the `async="true"` with just `async`
  const headScript = replaceHeadAttributes(head);
  expect(await amp(container.innerHTML, headScript)).toBeValidAmpHtml();
});
