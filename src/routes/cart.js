import { Router } from 'express';
import { cartController } from '../controllers/cart';
import { checkAdmin } from '../middleware/admin';

const router = Router();

router.get('/', cartController.getProducts);

router.get(
  '/:id',
  //cartController.checkCartExists,
  cartController.getProducts
);

router.post(
  '/',
  cartController.checkAddProductCart,
  cartController.addProductCart
);

router.delete(
  '/:id',
  cartController.checkCartExists,
  cartController.deleteProductCart
);

export default router;