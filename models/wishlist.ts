import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  // guest id or auth user
  // user: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'User', // user model
  //   required: true
  // },
  user: {
    type: String
  },
  productId: {
    type: String,
  },
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