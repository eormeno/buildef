import AWidget from "@components/AWidget";

class AWInput extends AWidget {

   type
   name
   label
   placeholder
   value
   readonly
   validate
   success
   error
   required
   disabled
   help
   formId

   constructor(options = {
      type: "text",
      label: "",
      value: "",
      placeholder: "",
      name: "",
      readonly: false,
      required: false,
      disabled: false,
      help: "",
      error: "",
      formId: null
   }) {
      super({ suffixClassName: "Component", ...options });
      this.validate = options.validate || ((value) => { return true; });
      this.setType(options.type);
      this.setName(options.name);
      this.setLabel(options.label);
      this.setPlaceholder(options.placeholder);
      this.setValue(options.value);
      this.setReadOnly(options.readonly);
      this.setError(options.error);
      this.setRequired(options.required);
      this.setDisabled(options.disabled);
      this.setHelp(options.help);
      this.setFormId(options.formId);
   }

   setType(type) {
      this.changeAttribute("type", type);
   }

   setName(name) {
      this.changeAttribute("name", name);
   }

   setLabel(label) {
      this.changeAttribute("label", label);
   }

   setPlaceholder(placeholder) {
      this.changeAttribute("placeholder", placeholder);
   }

   setReadOnly(readonly) {
      this.changeAttribute("readonly", readonly);
   }

   setRequired(required) {
      this.changeAttribute("required", required);
   }

   setDisabled(disabled) {
      this.changeAttribute("disabled", disabled);
   }

   setValue(value, registerChange = true) {
      if (this.validate(value)) {
         if (registerChange) {
            this.changeAttribute("value", value);
         }
         this.value = value;
      } else {
         this.setError("Invalid value");
      }
   }

   setError(error) {
      this.changeAttribute("error", error);
   }

   setHelp(help) {
      this.changeAttribute("help", help);
   }

   setFormId(formId) {
      this.changeAttribute("formId", formId);
   }

   toJSON() {
      return {
         ... super.toJSON(),
         type: this.type,
         name: this.name,
         label: this.label,
         placeholder: this.placeholder,
         value: this.value,
         readonly: this.readonly,
         error: this.error,
         required: this.required,
         help: this.help,
         disabled: this.disabled,
         formId: this.formId
      }
   }
}

module.exports = AWInput