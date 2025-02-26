import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  guid: {
    type: String
  },
  productId: {
    type: String,
  },
})

export default mongoose.model('WishlistProduct', wishlistSchema)