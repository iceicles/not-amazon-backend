import productSchema from '../models/product'

// retrive all products from db
export const getAllProducts = async (req: any, res: any) => {

  const products = await productSchema.find({})

  res.status(200).json({products, nbHits: products.length})
}