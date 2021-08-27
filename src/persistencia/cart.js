import { productsPersistencia } from '../persistencia/products';
let cart = [];
let productsCart = [];
  
  
  class Cart {
    find(id){
      return cart.find((aCart) => aCart.id === Number(id));
    }

    get(id) {
      if (id) {
        return cart.filter((aCart) => aCart.id === id);
      }
      return cart;
    }
  
    add(data) {
        productsCart = productsPersistencia.get(data.productId);
      const newItem = {
        id: cart.length + 1,
        timestamp: Date.now(),
        product: productsCart
      };
      cart.push(newItem);
      return newItem;
    }

  
    delete(id) {
      cart = cart.filter((aCart) => aCart.id !== id);
      return cart;
    }
  }
  
  export const cartPersistencia = new Cart();