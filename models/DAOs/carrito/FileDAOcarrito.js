const logger = require("../../../logger/winston-logger")
const fs = require("fs") ;

class FileDAOcarrito {
    constructor(ruta){
        this.ruta = ruta;        
    }    

    async saveNew(objProd){
        try{
            const objs = await this.getAll();
            let _id;
            if (!objs || !objs.lenght){
                _id =1
            }else{
                objs.forEach( ob =>{
                    _id  = ob._id
                });
                _id = _id+1
            }            
            const guardar = objs.lenght ? [...objs, {...objProd, _id}] :[{...objProd, _id}]
            logger.log("info", guardar)
            const guardado = await fs.promises.writeFile(this.ruta, JSON.stringify(guardar), {encoding:'utf-8'})
            logger.log("info", "guardado")
        }
        catch(error){
            logger.log("error", "no se pudo guardar")
        }
    }

    async getAll(){
        try{
            const objetos = await fs.promises.readFile(this.ruta, 'utf-8');
            console.log(objetos)
            if(!objetos.length){
            return []
            }else{
                const res = await JSON.parse(objetos);
                return res
            }           
        }
        catch(err){
            logger.log("error", "no se pudo obtener")
        }
    }

    async findById(_id){
        const todos = await this.getAll()
        const buscado = todos.find(ob => ob._id == _id);
            if(buscado){
                return buscado
            }else{
                logger.log("error", "no encontrado")
            }
    }

    async deleteById(id){
        try{
            const objs = await this.getAll();
            const obj = objs.find((item)=> item._id == id)
            if (!obj){
                logger.log("error", 'No se encontró qué borrar')
            } else{
                const newArr = objs.filter(ob => ob._id != id);
                const eliminar = await fs.promises.writeFile(this.ruta, JSON.stringify(newArr), {encoding:'utf-8'})
                return "eliminado"
            }
        }
        catch(err){
            logger.log("error", "no se pudo eliminar")
        }
    }

        async getProductList(id){
        const carrito = await this.findById(id);
        if(carrito){
          const productos = carrito.productos;
          const productosMap = productos.map( (item) => (
            {
              _id: item._id,
              title:item.title,
              price:item.price,
              thumbnail:item.thumbnail,
              quantity:item.quantity,
            }
          ))
          return productosMap 
        }else{
          return false
        }
    }

    

    async AddProdToCart(objetoProd, id){
        try{ 
            const carrito = this.findById(id)
            const newCarrito = carrito.productos.push(objetoProd)
            const carritos = await this.getAll();
            const quitarObj = carritos.filter((item)=> item._id != id)
            const newArr = [...quitarObj, newCarrito];
            await fs.promises.writeFile(this.ruta, JSON.stringify(newArr), { encoding: 'utf-8'})
            return newCarrito
        } 
        catch (error) {
            logger.log("error", error)
        }
            
    }

    

    async findProdInCart(idcarrito, idProd){
        const carrito = await this.findById(idcarrito);
        const productos = carrito.productos;
        const producto = productos.find((item)=> item._id == idProd)
        return producto;
    }

    async addRepeatedProd(idProd, cantPrevia, cantSumar, idcarrito){
        const nuevaCant = cantPrevia + cantSumar;
        const carrito = await this.findById(idcarrito);
        const arrProductos = carrito.productos;   
        arrProductos.find(element => element._id == idProd).quantity = nuevaCant
        carrito.productos = arrProductos
        const todosCarritos = await this.getAll();
        const quitarCArrito = todosCarritos.filter((item)=> item._id != idcarrito)
        const newArrCarritos = [...quitarCArrito, carrito];
        await fs.promises.writeFile(this.ruta, JSON.stringify(newArrCarritos), { encoding: 'utf-8'})
    }

    async deleteProd(id, idprod){
        const carrito = await this.findById(id);
        const arrProductos = carrito.productos; 
        const quitarProd = arrProductos.filter((item)=> item._id != idprod)
        carrito.productos = arrProductos;
        const todosCarritos = await this.getAll();
        const quitarCArrito = todosCarritos.filter((item)=> item._id != idcarrito)
        const newArrCarritos = [...quitarCArrito, carrito];
        await fs.promises.writeFile(this.ruta, JSON.stringify(newArrCarritos), { encoding: 'utf-8'})

    }


}

module.exports = FileDAOcarrito;