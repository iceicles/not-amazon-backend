import express from 'express'
import { createWishlistProduct, getAllWishlistProducts, deleteWishlistProduct, getWishlistProduct} from '../controllers/wishlist'

const router = express.Router()

router.route('/').get(getAllWishlistProducts).get(getWishlistProduct).put(createWishlistProduct)
router.route('/:id').delete(deleteWishlistProduct)

export default router