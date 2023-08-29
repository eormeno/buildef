import AWButton from "@components/AWButton";
import AWInput from "@components/AWInput";
import Page from "@components/AWPage";
import AWParagraph from "@components/AWParagraph";

class MainPage extends Page {

   counter = 0;
   nickName = "";

   constructor(options = {}) {
      super({ title: "Main Page", suffixClassName: "Page", ...options });
      this.add(new AWParagraph({ text: "Main Page", level: 1, ...options }));
      this.add(new AWParagraph({ text: "This is the main page.", level: 2, ...options }));
      this.add(new AWButton({ text: "Login", action: "login", primary: "true", ...options }));
      this.add(new AWButton({ text: "Register", action: "register", primary: "true", ...options }));


      this.informacion = new AWParagraph({ text: "...", level: 3, ...options });
      this.add(this.informacion);
      this.add(new AWButton({ text: "Saluda", action: "cambiarTexto", primary: "true", ...options }));

      this.counterParagraph = new AWParagraph({ text: "Counter: 0", level: 0, ...options });
      this.add(this.counterParagraph);
      this.add(new AWButton({ text: "Increment", action: "incrementCounter", primary: "false", ...options }));

      this.nickNameInput = new AWInput({
         label: "Nick name",
         name: "nickName",
         required: "true",
         help: "How do we should name you?",
         placeholder: "Enter your nick name",
         validate: this.validateNickName,
         ...options
      });
      this.add(this.nickNameInput);

      this.fibonacciInput = new AWInput({
         label: "Fibonacci",
         name: "fibonacci",
         placeholder: "Enter a number",
         readonly: "true",
         ...options
      });
      this.add(this.fibonacciInput);
   }

   validateNickName(nickName) {
      if (typeof nickName === "string") {
         return nickName.length > 0;
      }
      return true
   }

   login() {
      this.changePage("LoginPage");
   }

   register() {
      this.changePage("RegisterPage");
   }

   incrementCounter() {
      this.counter++;
      this.counterParagraph.setText(`Counter: ${this.counter}`);
      this.fibonacciInput.setValue(this.calculateFibonacci(this.counter));
      this.nickNameInput.setValue(this.nickName.toUpperCase());
   }

   cambiarTexto() {
      this.informacion.setText("HOLA MUNDO!");
   }

   calculateFibonacci(number) {
      const fibonacci = (n) => {
         if (n < 2) {
            return n;
         }
         return fibonacci(n - 1) + fibonacci(n - 2);
      };
      return fibonacci(number);
   }
}

module.exports = MainPage