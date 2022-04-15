import "../css/loading-component.css";

const toggleLoading = (state, message) => {
  document.querySelector("loading-component").dispatchEvent(new CustomEvent("toggle", { detail: { state, message } }));
};

class LoadingComponent extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("toggle", e => this.toggle(e.detail));
  }

  toggle({ state, message }) {
    if (message) {
      this.querySelector("#message").innerHTML = message;
    }
    if (state) {
      this.style.visibility = "visible";
      this.style.opacity = "1";
    } else {
      setTimeout(() => {
        this.style.visibility = "hidden";
        this.style.opacity = "0";
      }, 500);
    }
  }

  connectedCallback() {
    this.innerHTML = `<div class="loading__spinner"></div><div id="message" class="loading__message"></div>`;
  }
}

customElements.define("loading-component", LoadingComponent);
export { toggleLoading };
