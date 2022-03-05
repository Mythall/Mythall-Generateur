class MenuLinks extends HTMLElement {
  constructor() {
    super();
  }
}

class MenuNavigation extends HTMLElement {
  constructor() {
    super();

    this.menuLinks = this.querySelector("menu-links");

    const menuLink = document.createElement("a");
    menuLink.setAttribute("href", "/");
    menuLink.innerHTML = "Home";

    this.menuLinks.append(menuLink);
  }
}

customElements.define("menu-links", MenuLinks);
customElements.define("menu-navigation", MenuNavigation);
