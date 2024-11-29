import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: Number
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: Object
  }
})

export default mongoose.model('Product', productSchema)