import AWButton from "@components/AWButton";
import Page from "@components/AWPage";
import AWParagraph from "@components/AWParagraph";

class CMSPage extends Page {

   constructor(options = {}) {
      super({ title: "CMS Page", suffixClassName: "Page", ...options });
      this.add(new AWParagraph({ text: "CMS Page", level: 1 }));
      this.add(new AWButton({ text: "Close session", action: "logout" }));
   }

   logout() {
      this.changePage("MainPage");
   }

}

module.exports = CMSPage