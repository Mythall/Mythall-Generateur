import "../css/modal-component.css";

const toggleModal = (state, message, successCallback) => {
  document.querySelector("modal-component").dispatchEvent(new CustomEvent("toggle", { detail: { state, message, successCallback } }));
};

class ModalComponent extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("click", e => this._clickHandler(e));
    this.addEventListener("toggle", e => this.toggle(e.detail));
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="modal">
      <div id="message"></div>
      <div class=modal__buttons>
        <button id="cancel" class="button__default">Cancel</button>
        <button id="confirm" class="button__primary">Confirm</button>
      </div>
    </div>
    `;
  }

  _clickHandler(event) {
    if (event.target.nodeName.toLowerCase() === "modal-component" || event.target.id == "cancel") {
      this.toggle(false);
    }
  }

  async _successHandler(callBack) {
    await callBack();
    this.toggle(false);
  }

  async toggle({ state, message, successCallback }) {
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
    if (successCallback) this.querySelector("#confirm").addEventListener("click", async () => await this._successHandler(successCallback));
  }
}

customElements.define("modal-component", ModalComponent);

export { toggleModal };
