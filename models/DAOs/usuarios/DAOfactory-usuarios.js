const {MongoUsuarios, Usuarios} = require("./MongoDAOusuarios");



class DAOFactoryUsuarios{
    constructor(PERSISTENCIA){
      this.PERSISTENCIA = PERSISTENCIA
    
      switch (this.PERSISTENCIA) {
        case "MONGO":
          return new MongoUsuarios(Usuarios);
        default:
          return new MongoUsuarios(Usuarios);
      }
    }
  }

module.exports = DAOFactoryUsuarios