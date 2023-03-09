const logger = require("../../../logger/winston-logger")

class MemoryDAOproductos{
    constructor(){
        this.arrMem = [];
    }

    
    getAll(){
        try{
            const productos = this.arrMem;
            return productos
        }
        catch(err){
            return []
        }
    }

    async findById(_id){
        const prod = this.arrMem.find((item)=> item._id == _id)
        return prod
    }

    saveNew(ob){
        try{
            const productos = this.AllProducts();
            let _id;
            if (!productos || !productos.lenght){
                _id =1
            }else{
                productos.forEach( ob =>{
                    _id  = ob._id
                });
                _id = _id+1
            }
            const guardar = productos.lenght ? [...productos, {...ob, _id}] : [{...ob, _id}];
            this.arrMem = guardar;
            logger.log("info", "nuevo producto guardado")
        }
        catch(error){
            logger.log("error", error)
        }
    }
    async deleteById(idprod){
        try{
            const objs =  this.arrMem;
            const obj = objs.find((item)=> item._id == idprod)
            if (!obj){
                logger.log("error", 'No se encontró qué borrar')
            } else{
                const newArr = objs.filter(ob => ob._id != idprod);
                this.arrMem = newArr;
            }
        }
        catch(err){
            logger.log("error", "no se pudo eliminar")
        }    
    }

    listCategory(categorySelect){
        const categoryProductos = this.arrMem.filter((item)=> item.category == categorySelect)
        return categoryProductos
    } 

    

    findProdUpdate(idprod, title, price, thumbnail, category){
        const newObj = {
            _id:idprod,
            title,
            price,
            thumbnail,
            category
        }
        try{ 
            const objs = this.arrMem;
            const quitarObj = objs.filter((item)=> item._id != idprod);
            const newArr = [...quitarObj, newObj];
            this.arrMem = newArr;
            return newObj
        }
        catch(err){
            logger.log("error", err)
        }
    }

    

}

module.exports = MemoryDAOproductos