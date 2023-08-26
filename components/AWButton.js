import AWidget from "@components/AWidget";

class AWButton extends AWidget {

   text
   level
   action
   primary
   disabled
   formId

   constructor(options = { text: "Button", primary: "true", action: "", formId: null }) {
      super({ suffixClassName: "Component", ...options });
      this.setText(options.text);
      this.setPrimary(options.primary);
      this.setDisabled(options.disabled);
      this.setAction(options.action);
      this.setFormId(options.formId);
   }

   setText(text) {
      this.changeAttribute("text", text);
   }

   setPrimary(primary) {
      this.changeAttribute("primary", primary);
   }

   setDisabled(disabled) {
      this.changeAttribute("disabled", disabled);
   }

   setAction(action) {
      this.changeAttribute("action", action);
   }

   setFormId(formId) {
      this.changeAttribute("formId", formId);
   }

   toJSON() {
      return {
         ... super.toJSON(),
         text: this.text,
         primary: this.primary,
         disabled: this.disabled,
         action: this.action,
         formId: this.formId
      }
   }
}

module.exports = AWButton