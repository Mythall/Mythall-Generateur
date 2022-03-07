import { auth } from "../assets/js/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

class LoginComponent extends HTMLElement {
  constructor() {
    super();

    // Form Controls
    this.email = this.querySelector("#email");
    this.password = this.querySelector("#password");

    // Add touched class to inputs when focus
    this.querySelectorAll("input").forEach(i => i.addEventListener("blur", i => i.target.classList.toggle("touched", true)));

    // Form submit
    this.addEventListener("submit", async event => await this.signIn(event));
  }

  signIn = async event => {
    event.preventDefault();

    try {
      // Login
      const userCredential = await signInWithEmailAndPassword(auth, this.email.value, this.password.value);
      const user = userCredential.user;

      // Redirect
      window.location.href = "/";
    } catch (error) {
      alert(error);
    }

    return;
  };
}

customElements.define("login-component", LoginComponent);
