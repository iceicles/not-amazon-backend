import express from 'express'
import { createWishlistProduct, getAllWishlistProducts, deleteAllWishlistProducts} from '../controllers/wishlist'

const router = express.Router()

router.route('/').get(getAllWishlistProducts).put(createWishlistProduct).delete(deleteAllWishlistProducts)

export default router