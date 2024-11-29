import express from 'express';

const router = express.Router()

import { getAllProducts } from '../controllers/product';

// '/' => '/api/v1/products'
router.route('/').get(getAllProducts)

export default router;