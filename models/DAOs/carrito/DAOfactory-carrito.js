const {MongoDAOcarrito, CarritoModel} = require("./MongoDAOcarrito")
const MemoryDAOcarrito = require("./MemoryDAOcarrito")
const FileDAOcarrito = require("./FileDAOcarrito")


class DAOFactoryCarrito{
    constructor(PERSISTENCIA){
      this.PERSISTENCIA = PERSISTENCIA
      switch (this.PERSISTENCIA) {
        case "MEM":
          return new MemoryDAOcarrito();
        case "FILE":
          return new FileDAOcarrito("./models/DAOs/carrito/carrito.json");
        case "MONGO":
          return new MongoDAOcarrito(CarritoModel);
        default:
          return new MongoDAOcarrito(CarritoModel);
      }
    }
  }
 
  module.exports = DAOFactoryCarrito;