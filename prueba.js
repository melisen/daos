
/*let instance = null;
class DAOFactoryProductos{
    constructor(){
      this.numero = Math.random();
    }

    printValue(){
      console.log(this.numero)
    }
    static getInstance(){
      if(!instance){
        instance = new DAOFactoryProductos()
      }
      return instance
    }
  }

  const a = DAOFactoryProductos.getInstance()
  const value1 = DAOFactoryProductos.printValue()
  const value2 = DAOFactoryProductos.printValue()
  const b = DAOFactoryProductos.getInstance()
  const value3 = DAOFactoryProductos.printValue()
  */

  class MyClass {
    constructor() {
      if (MyClass._instance) {
        console.log("Singleton classes can't be instantiated more than once.")
      }
      MyClass._instance = this;
  
      // ... Your rest of the constructor code goes after this
    }
  }
  
  var instanceOne = new MyClass() // Executes succesfully
  var instanceTwo = new MyClass() // Throws error