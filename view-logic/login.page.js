import AWButton from "@components/AWButton";
import Page from "@components/AWPage";
import AWInput from "@components/AWInput";
import AWForm from "@components/AWForm";

class LoginPage extends Page {

   email = "";
   password = "";

   constructor(options = {}) {
      super({ title: "Login Page", suffixClassName: "Page", ...options });

      this.loginForm = new AWForm({ title: "Login", submit: "Login", action: "login" });

      this.usernameInput = new AWInput({ name: "email", type: "email", placeholder: "Your email", label: "Email", required: "true" });
      this.passwordInput = new AWInput({ name: "password", type: "password", placeholder: "Password", label: "Password", required: "true" });

      this.loginForm.add(this.usernameInput);
      this.loginForm.add(this.passwordInput);

      this.add(this.loginForm);
      this.add(new AWButton({ text: "Reset password", action: "resetPassword", primary: "false" }));
   }

   setEmail(email) {
      this.email = email;
   }

   setPassword(password) {
      this.password = password;
   }

   login() {
      this.log(`Login with username: ${this.email} and password: ${this.password}`);
      this.changePage("CMSPage");
   }

   resetPassword() {
      this.changePage("ResetPasswordPage");
   }
}

module.exports = LoginPage