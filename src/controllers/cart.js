import { Request, Response, NextFunction } from 'express';
import { cartPersistencia } from '../persistencia/cart';

class Cart {
  checkAddProductCart(req, res, next) {
    const { timestamp, productId } = req.body;

    if (!productId ||
      isNaN(productId)) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    }

    next();
  }

  checkCartExists(req, res, next) {
    const id = Number(req.params.id);
    const Cart = cartPersistencia.find(id);

    if (!Cart) {
      return res.status(404).json({
        msg: 'Producto no encontrado',
      });
    }
    next();
  }

  getProducts(req, res) {
    const id = Number(req.params.id);
    const productCart = id
      ? cartPersistencia.get(id)
      : cartPersistencia.get();

    res.json({
      data: productCart,
    });
  }

  addProductCart(req, res) {
    const newItem = cartPersistencia.add(req.body);

    res.json({
      msg: 'Producto agregado',
      data: newItem,
    });
  }

  deleteProductCart(req, res) {
    const id = Number(req.params.id);

    cartPersistencia.delete(id);
    res.json({
      msg: 'Producto eliminado',
    });
  }
}

export const cartController = new Cart();