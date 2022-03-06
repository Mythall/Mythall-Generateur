import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

class LoginComponent extends HTMLElement {
  constructor() {
    super();
    this.querySelector("#submit").addEventListener("click", async () => await this.signIn());
  }

  signIn = async () => {
    const email = this.querySelector("#email")?.value;
    const password = this.querySelector("#password")?.value;

    if (email && password) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    }
    return false;
  };
}

customElements.define("login-component", LoginComponent);
