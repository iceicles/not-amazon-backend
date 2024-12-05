import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  // guest id or auth user
  name: {
    type: String,
  },
  productId: {
    type: String,
  }
  // title: {
  //   type: String,
  // },
  // price: {
  //   type: Number
  // },
  // description: {
  //   type: String,
  // },
  // category: {
  //   type: String,
  // },
  // image: {
  //   type: String,
  // },
  // rating: {
  //   type: Object
  // }
})

export default mongoose.model('WishlistProduct', wishlistSchema)