import AWButton from "@components/AWButton";
import Page from "@components/AWPage";
import AWParagraph from "@components/AWParagraph";

class RegisterPage extends Page {

   constructor(options = {}) {
      super({ title: "Register Page", suffixClassName: "Page", ...options });
      this.add(new AWParagraph({ text: "Registering Page", level: 1 }));
      this.add(new AWParagraph({ text: "This is the registering page.", level: 2 }));
      this.add(new AWButton({ text: "Return to main page", action: "returnToMainPage" }));
   }

   returnToMainPage() {
      this.changePage("MainPage");
   }

}

module.exports = RegisterPage