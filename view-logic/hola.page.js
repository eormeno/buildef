import Page from "@components/AWPage";
import AWButton from "@components/AWButton";
import AWParagraph from "@components/AWParagraph";

class HolaMundoPage extends Page {

   constructor(options = {}) {
      super({
         title: "Hola Mundo",
         suffixClassName: "Page",
         ...options
      });

      this.informacion = new AWParagraph({
         text: "...",
         level: 3,
         ...options
      });
      this.add(this.informacion);
      this.add(new AWButton({
         text: "Diga algo",
         action: "saludar",
         primary: "true",
         ...options
      }));
   }

   saludar() {
      this.informacion.setText("HOLA MUNDO!");
   }
}

module.exports = HolaMundoPage