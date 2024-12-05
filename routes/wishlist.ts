import express from 'express'
import { createWishlistProduct, getAllWishlistProducts } from '../controllers/wishlist'

const router = express.Router()

router.route('/').get(getAllWishlistProducts).put(createWishlistProduct)

export default router