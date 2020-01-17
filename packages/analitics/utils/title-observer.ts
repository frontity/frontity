export default class TitleObserver {
  private titleElement: HTMLTitleElement;
  private titleText: string;
  private observer: MutationObserver;
  private resolve: Function;

  constructor() {
    if (
      typeof window === "undefined" ||
      typeof window.MutationObserver === "undefined"
    ) {
      throw new Error(
        "TitleObserver can only be instantitated in the browser that supports the MutationObserver API."
      );
    }

    // Get title element and innerText.
    this.titleElement = document.querySelector("title");
    this.titleText = this.titleElement.innerText;

    // Set up mutation.
    this.observer = new MutationObserver(() => {
      // Uses requestAnimationFrame to avoid reflows when accessing innerText.
      window.requestAnimationFrame(() => {
        const { innerText } = this.titleElement;
        if (innerText !== this.titleText) {
          this.titleText = innerText;
          this.resolve(innerText);
        }
      });
    });

    // Start observe changes in title content.
    this.observer.observe(this.titleElement, { childList: true });
  }

  public waitForChanges() {
    return new Promise<string>(resolve => {
      this.resolve = resolve;
    });
  }
}
