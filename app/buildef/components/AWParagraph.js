import AWidget from "@components/AWidget";

class AWParagraph extends AWidget {

   text
   level

   constructor(options = { text: "", level: 0 }) {
      super({ suffixClassName: "Component", ...options });
      this.setText(options.text);
      this.setLevel(options.level);
   }

   setText(text) {
      this.changeAttribute("text", text);
   }

   setLevel(level) {
      this.changeAttribute("level", level);
   }

   toJSON() {
      const json = {
         text: this.text,
         level: this.level,
         ... super.toJSON()
      }
      return json;
   }
}

module.exports = AWParagraph