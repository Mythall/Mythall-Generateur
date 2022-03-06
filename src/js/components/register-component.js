import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

class RegisterComponent extends HTMLElement {
  constructor() {
    super();
    this.querySelector("#submit").addEventListener("click", async () => await this.signUp());
  }

  signUp = async () => {
    const email = this.querySelector("#email")?.value;
    const password = this.querySelector("#password")?.value;

    if (email && password) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    }
    return false;
  };
}

customElements.define("register-component", RegisterComponent);
