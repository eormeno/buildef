import Page from "@components/AWPage";
import AWInput from "@components/AWInput";
import Form from "@components/AWForm";

class ResetPasswordPage extends Page {

   constructor(options = {}) {
      super({ title: "Reset password Page", suffixClassName: "Page", ...options });
      
      this.reserPasswordForm = new Form({ title: "Reset password", submit: "Reset password", action: "resetPassword" });
      this.reserPasswordForm.add(new AWInput({ name: "email", type: "text", placeholder: "Enter your email" }));
      this.add(this.reserPasswordForm);
   }

   resetPassword() {
      this.changePage("LoginPage");
   }

}

module.exports = ResetPasswordPage