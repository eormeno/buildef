import AWContainer from "@components/AWContainer";

class AWPage extends AWContainer {

   title;

   constructor(options = {}) {
      super({ suffixClassName: "Component", ...options });
      this.title = options.title || "Page";
   }

   onInputChange(data = {}) {
      const element = this.findElementById(data.id);
      if (element) {
         element.setValue(data.value);
      }
   }

   toJSON() {
      return {
         ...super.toJSON(),
         class: "Page",
         page: this.constructor.name,
         title: this.title
      }
   }
}

module.exports = AWPage