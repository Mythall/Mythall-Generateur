import banner from "../img/banner.jpeg";
import logo from "../img/mythall.png";

class BannerComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <style>
      .banner {
        background-image: url("${banner}");
        background-size: cover;
        background-repeat: no-repeat;
        padding: var(--space-lg);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .banner__img {
        max-width: 100%;
        height: auto;
      }
    </style>
    <section class="banner">
      <img class="banner__img" alt="Mythall" width="425" height="146" src="${logo}" />
    </section>`;
  }
}

customElements.define("banner-component", BannerComponent);
