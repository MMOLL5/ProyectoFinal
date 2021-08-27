import { Request, Response, NextFunction } from 'express';
import { productsPersistencia } from '../persistencia/products';

class Producto {
  checkAddProducts(req, res, next) {
    const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body;

    if (!nombre || !descripcion || !codigo|| !foto || !precio|| !stock|| 
      typeof nombre !== 'string' ||
      typeof descripcion !== 'string' || 
      typeof codigo !== 'string' || 
      typeof foto !== 'string' || 
      isNaN(precio) ||
      isNaN(stock)) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    }

    next();
  }

  checkProductExists(req, res, next) {
    const id = Number(req.params.id);
    const producto = productsPersistencia.find(id);
    console.log('checkProductExists');
    if (!producto) {
      return res.status(404).json({
        msg: 'Producto no encontrado',
      });
    }
    next();
  }

  getProducts(req, res) {
    const id = Number(req.params.id);
    const producto = id
      ? productsPersistencia.get(id)
      : productsPersistencia.get();

    res.json({
      data: producto,
    });
  }

  addProducts(req, res) {
    const newItem = productsPersistencia.add(req.body);

    res.json({
      msg: 'Producto agregado',
      data: newItem,
    });
  }

  updateProducts(req, res) {
    const id = Number(req.params.id);

    productsPersistencia.update(id, req.body);
    res.json({
      msg: 'Producto actualizado',
    });
  }

  deleteProducts(req, res) {
    const id = Number(req.params.id);

    productsPersistencia.delete(id);
    res.json({
      msg: 'Producto eliminado',
    });
  }
}

export const productsController = new Producto();