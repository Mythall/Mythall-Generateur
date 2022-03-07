class LoadingComponent extends HTMLElement {
  constructor() {
    super();

    window.addEventListener("DOMContentLoaded", event => {
      setTimeout(() => {
        this.style.visibility = "hidden";
        this.style.opacity = "0";
      }, 500);
    });
  }
}

customElements.define("loading-component", LoadingComponent);
