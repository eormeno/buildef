import AWidget from "@components/AWidget";

class Container extends AWidget {

   elements = []

   constructor(options = {}) {
      super({ suffixClassName: "Component", ...options });
   }

   add(element) {
      this.elements.push(element);
      if (this.manager) {
         this.manager.registerAddedObject(this.session, this.id, element);
      }
   }

   findElementById(id) {
      let element = null;
      this.elements.forEach(child => {
         if (child.id == id) {
            element = child;
         } else if (child.elements) {
            element = child.findElementById(id);
         }
      });
      return element;
   }

   processElements() {
      let elements = [];
      if (this.elements) {
         elements = this.elements.map(element => {
            return element.toJSON();
         });
      }
      return elements.filter(element => element);
   }

   toJSON() {
      const elements = this.processElements();
      return {
         ... super.toJSON(),
         elements: elements
      }
   }
}

module.exports = Container