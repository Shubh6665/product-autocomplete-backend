import { Router } from 'express';
import { searchHandler } from '../controllers/productController';

const router = Router();
router.get('/products/search', searchHandler);

export default router;
