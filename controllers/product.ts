import productSchema from '../models/product'

// retrive all products from db
export const getAllProducts = async (req: any, res: any) => {

  const queryObject = {}

  let result = productSchema.find(queryObject);

   /* skip and limit for pagination */
   const page = Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 6; // default to 6 products
   const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
 
  const products = await result.find({})

  res.status(200).json({products, nbHits: products.length})
}