import fs from 'fs';
let productos = [];
  
  
  class Productos {
    find(id){
      return productos.find((aProduct) => aProduct.id === Number(id));
    }

    get(id) {
      if (id) {
        return productos.filter((aProduct) => aProduct.id === id);
      }
      
      let readline = require('readline');
      let reader = readline.createInterface({
      input: fs.createReadStream('products.txt')
      });

      reader.on('line', (line) => {
      productos.push(JSON.parse(line));
      });
      return productos;
    }
  
    add(data) {
      const newItem = {
        id: productos.length + 1,
        timestamp: Date.now(),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock
      };      
      productos.push(newItem);

      fs.appendFileSync('products.txt', JSON.stringify(newItem)+'\n', error =>{
        if(error)
          console.log('Error al guardar el producto');
    });
  
      return newItem;
    }
  
    update(id, data){
      let index = productos.findIndex((aProduct) => aProduct.id === id);
      productos[index].timestamp = data.timestamp;
      productos[index].nombre = data.nombre;
      productos[index].descripcion = data.descripcion;
      productos[index].precio = data.codigo;
      productos[index].precio = data.foto;
      productos[index].precio = data.precio;
      productos[index].precio = data.stock;

      return productos.filter((aProduct) => aProduct.id === id);
     }
  
    delete(id) {
      productos = this.get();
      productos = productos.filter((aProduct) => aProduct.id !== id);

      fs.unlink('products.txt');

      fs.writeFileSync('products.txt', JSON.stringify(productos)+'\n', error =>{
        if(error)
          console.log('Error al guardar el producto');
      });

      return productos;
    }
  }
  
  export const productsPersistencia = new Productos();