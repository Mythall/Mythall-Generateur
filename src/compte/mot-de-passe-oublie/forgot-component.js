import { auth } from "../../assets/js/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

class ForgotComponent extends HTMLElement {
  constructor() {
    super();

    // Form Controls
    this.email = this.querySelector("#email");

    // Add touched class to inputs when focus
    this.querySelectorAll("input").forEach(i => i.addEventListener("blur", i => i.target.classList.toggle("touched", true)));

    // Form submit
    this.addEventListener("submit", async event => await this.resetPassword(event));
  }

  resetPassword = async event => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, this.email.value);

      // Redirect
      alert("Check your emails!");
      window.location.href = "/compte/connexion";
    } catch (error) {
      alert(error);
    }

    return;
  };
}

customElements.define("forgot-component", ForgotComponent);
