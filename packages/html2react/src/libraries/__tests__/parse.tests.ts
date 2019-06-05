import parse from "../parse";

describe("parse", () => {
  const html = `
    <!-- This is a comment -->
    <p id="paragraph">This is an html <span>example</span> for testing purposes.</p>

    <!-- [class] attribute -->
    <div class="hello">
      <img src="http://example.com/img.jpg">
    </div>
    
    <!-- [autoplay] standalone attribute ([key/value] should be [autoPlay/true] -->
    <audio autoplay>
      <source src="example.ogg" type="audio/ogg">
    </div>
  `;

  test("should return the right HTML tree", () => {
    const result = parse(html);
    expect(result).toMatchSnapshot();
  });
});
