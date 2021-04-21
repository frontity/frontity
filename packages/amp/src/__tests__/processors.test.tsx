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

test("Validate amp-img when height or width are a number", async () => {
  const { container } = render(
    <Html2React
      html="<img src='test.img' width=300 height=300></img>"
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

test("Validate amp-img when height and width are missing", async () => {
  const { container } = render(
    <Html2React html="<img src='test.img'></img>" processors={processors} />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <amp-img
      class="css-1fbfwfl"
      layout="fill"
      src="test.img"
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
      sandbox="allow-scripts allow-same-origin "
      src="test.html"
      title=""
      width="auto"
    />
  `);

  // We replace the `async="true"` with just `async`
  const headScript = replaceHeadAttributes(head);
  expect(await amp(container.innerHTML, headScript)).toBeValidAmpHtml();
});

test("amp-iframe should concatenate the sandbox properties", () => {
  const helmetContext = {};

  const { container } = render(
    <HelmetProvider context={helmetContext}>
      <Html2React
        html="<iframe sandbox='allow-scripts allow-popups' src='test.html' width='auto' height='300'/>"
        processors={processors}
      />
    </HelmetProvider>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <amp-iframe
      height="300"
      layout="fixed-height"
      sandbox="allow-scripts allow-same-origin allow-scripts allow-popups"
      src="test.html"
      title=""
      width="auto"
    />
  `);
});

test("Validate amp-video", async () => {
  const helmetContext = {};

  const { container } = render(
    <HelmetProvider context={helmetContext}>
      <Html2React
        html="<video 
          width='250' 
          height='150' 
          src='video.mp4'  
          autoplay
          loop
          controls
          muted
        ></video>"
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
      autoplay=""
      controls=""
      height="250"
      layout="responsive"
      loop=""
      muted=""
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
        html="<audio src='audio.mp3'></audio>"
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
      src="audio.mp3"
    />
  `);

  // We replace the `async="true"` with just `async`
  const headScript = replaceHeadAttributes(head);
  expect(await amp(container.innerHTML, headScript)).toBeValidAmpHtml();
});

test("amp-audio with child elements", async () => {
  const helmetContext = {};

  const { container } = render(
    <HelmetProvider context={helmetContext}>
      <Html2React
        html="<audio controls>
          <source src='http://frontity.com/audio.mp3'></source>
          <div placeholder=''> this is a placeholder </div>
          <div placeholder=''> this placeholder should be removed </div>
          <p fallback=''> and this is a fallback </p>
          <p fallback=''> this is a fallback should be removed</p>
          <div> this element should be removed </div>
        </audio>"
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
      controls=""
    >
      <source
        src="https://frontity.com/audio.mp3"
      />
      <div
        placeholder=""
      >
         this is a placeholder 
      </div>
      <p
        fallback=""
      >
         and this is a fallback 
      </p>
    </amp-audio>
  `);
});

test("amp-video with child elements", async () => {
  const helmetContext = {};

  const { container } = render(
    <HelmetProvider context={helmetContext}>
      <Html2React
        html="<video controls>
          <source src='http://frontity.com/video.mp4'></source>
          <track src='http://frontity.com/video1.mp4'></source>
          <track src='http://frontity.com/video2.mp4'></source>
          <div placeholder=''> this is a placeholder </div>
          <div placeholder=''> this placeholder should be removed </div>
          <p fallback=''> and this is a fallback </p>
          <p fallback=''> this is a fallback should be removed</p>
          <div> this element should be removed </div>
        </video>"
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
      controls=""
      height="9"
      layout="responsive"
      width="16"
    >
      <source
        src="https://frontity.com/video.mp4"
      />
      <track
        src="https://frontity.com/video1.mp4"
      />
      <track
        src="https://frontity.com/video2.mp4"
      />
      <div
        placeholder=""
      >
         this is a placeholder 
      </div>
      <p
        fallback=""
      >
         and this is a fallback 
      </p>
    </amp-video>
  `);
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

test("picture element should be replaced with an img", async () => {
  const { container } = render(
    <Html2React
      html='
        <picture>
          <source media="(min-width:650px)" srcset="img_pink_flowers.jpg" />
          <source media="(min-width:465px)" srcset="img_white_flower.jpg" />
          <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;" width="300" height="100" />
        </picture>'
      processors={processors}
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <amp-img
      alt="Flowers"
      class="css-68zbsl"
      height="100"
      layout="responsive"
      src="img_orange_flowers.jpg"
      width="300"
    />
  `);
  expect(await amp(container.innerHTML)).toBeValidAmpHtml();
});

describe("Transform http to https and warn about it", () => {
  const consoleWarn = jest.spyOn(global.console, "warn");

  beforeEach(() => {
    consoleWarn.mockReset();
  });

  test("amp-iframe", () => {
    const helmetContext = {};

    const { container } = render(
      <HelmetProvider context={helmetContext}>
        <Html2React
          html="<iframe src='http://frontity.org/test.html' width='auto' height='300'/>"
          processors={processors}
        />
      </HelmetProvider>
    );

    expect(
      container.firstElementChild.getAttribute("src").startsWith("https://")
    ).toBe(true);

    expect(consoleWarn).toHaveBeenCalledTimes(1);
    expect(consoleWarn.mock.calls[0][0]).toMatchInlineSnapshot(`
      "<AMPIframe> element with src of https://frontity.org/test.html was found but AMP requires resources to be loaded over HTTPS.

      Frontity will update the src attribute to point to the HTTPS version but you need to ensure that the asset is available over HTTPS.
      Visit https://community.frontity.org for help! 🙂
      "
    `);
  });

  test("amp-audio", () => {
    const helmetContext = {};
    const consoleWarn = jest.spyOn(global.console, "warn");

    const { container } = render(
      <HelmetProvider context={helmetContext}>
        <Html2React
          html="<audio src='http://frontity.org/audio.mp3'></audio>"
          processors={processors}
        />
      </HelmetProvider>
    );

    expect(
      container
        .getElementsByTagName("amp-audio")[0]
        .getAttribute("src")
        .startsWith("https://")
    ).toBe(true);

    expect(consoleWarn).toHaveBeenCalledTimes(1);
    expect(consoleWarn.mock.calls[0][0]).toMatchInlineSnapshot(`
      "<AMPAudio> element with src of https://frontity.org/audio.mp3 was found but AMP requires resources to be loaded over HTTPS.

      Frontity will update the src attribute to point to the HTTPS version but you need to ensure that the asset is available over HTTPS.
      Visit https://community.frontity.org for help! 🙂
      "
    `);
  });

  test("amp-video", () => {
    const helmetContext = {};
    const consoleWarn = jest.spyOn(global.console, "warn");

    const { container } = render(
      <HelmetProvider context={helmetContext}>
        <Html2React
          html="<video 
          width='250' 
          height='150' 
          src='http://frontity.org/video.mp4'  
        ></video>"
          processors={processors}
        />
      </HelmetProvider>
    );

    expect(
      container
        .getElementsByTagName("amp-video")[0]
        .getAttribute("src")
        .startsWith("https://")
    ).toBe(true);

    expect(consoleWarn).toHaveBeenCalledTimes(1);
    expect(consoleWarn.mock.calls[0][0]).toMatchInlineSnapshot(`
      "<AMPVideo> element with src of https://frontity.org/video.mp4 was found but AMP requires resources to be loaded over HTTPS.

      Frontity will update the src attribute to point to the HTTPS version but you need to ensure that the asset is available over HTTPS.
      Visit https://community.frontity.org for help! 🙂
      "
    `);
  });
});
