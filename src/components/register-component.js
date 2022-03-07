import { auth } from "../assets/js/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

class RegisterComponent extends HTMLElement {
  constructor() {
    super();

    // Form Controls
    this.firstname = this.querySelector("#firstname");
    this.lastname = this.querySelector("#lastname");
    this.birthdate = this.querySelector("#birthdate");
    this.email = this.querySelector("#email");
    this.password = this.querySelector("#password");
    this.confirm = this.querySelector("#confirm");

    // Add touched class to inputs when focus
    this.querySelectorAll("input").forEach(i => i.addEventListener("blur", i => i.target.classList.toggle("touched", true)));

    // Confirm Password validation
    this.confirm.addEventListener("blur", () => this.confirmPassword());

    // Form submit
    this.addEventListener("submit", async event => await this.signUp(event));
  }

  confirmPassword = () => {
    if (this.password?.value != this.confirm?.value) {
      this.confirm.setCustomValidity("Passwords don't match");
      return;
    }
    this.confirm.setCustomValidity("");
  };

  signUp = async event => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email.value, this.password.value);
      const user = userCredential;

      // Create User in firestore with missing fields
      // ...

      // Redirect to profile
      // ...

      console.log(user);
    } catch (error) {
      // Create a toast component
      // ...

      // Display error to user
      // ...

      alert(error);
    }
    return;
  };
}

customElements.define("register-component", RegisterComponent);
