const c=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}};c();class l extends HTMLElement{constructor(){super();this.links=[{name:"Accueil",href:"/"},{name:"Contact",href:"/contact"}]}connectedCallback(){this.innerHTML=`
      <header class="header">
        <nav class="header__links">
          ${this.links.map(r=>`<a class="header__link" href="${r.href}">${r.name}</a>`).join("")}
        </nav>
      </header>
    `}}customElements.define("header-component",l);class a extends HTMLElement{constructor(){super();this.copyright=`Mythall ${new Date().getFullYear()} \xA9 Tous droits r\xE9serv\xE9es`}connectedCallback(){this.innerHTML=`
      <footer class="footer">
        <div class="footer__copyright">${this.copyright}</div>
      </footer>
    `}}customElements.define("footer-component",a);
