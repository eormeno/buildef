import AWContainer from "@components/AWContainer";
import AWButton from "@components/AWButton";

class AWForm extends AWContainer {

   title;
   submit;
   action;
   submitButton;

   constructor( options = { title: "Form", submit: "Submit", action: "submit" } ) {
      super({ suffixClassName: "Component", ...options });
      this.title = options.title || "Form";
      this.submit = options.submit || "Submit";
      this.action = options.action || "submit";
      this.submitButton = new AWButton({ text: this.submit, action: this.action, primary: "true" });
      this.submitButton.setFormId(this.id);
   }

   add(element) {
      super.add(element);
      element.setFormId(this.id);
   }

   toJSON() {
      let self = this;
      return {
         ... super.toJSON(),
         title: self.title,
         submit: self.submit,
         action: self.action,
         submitButton: self.submitButton.toJSON()
      }
   }
}

module.exports = AWForm