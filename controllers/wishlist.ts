import NotFoundError from '../errors/not-found';
import wishlistSchema from '../models/wishlist'
import crypto from 'crypto'


export const createWishlistProduct = async(req: any, res: any) => {
  const { payload } = req.body

  // const { name: userName } = payload


  // let result = wishlistSchema.find({})

  // let dbName = result.where('name').equals(userName)
  // if (!dbName) {
  //   console.log('dbname - ', dbName, "doesnt exist")
  // } else {
  //   console.log('here is the dbName - ', dbName)
  // }


  // if name exists in db AND if the productId already exists for that name,
  // don't add new productId to db

  // else
  // if name exists AND productId doesn't exist,
  // add new productId to db

  // else (name doesn't exist)
  // create new document


  console.log('req.body.payload - ', payload)
  const {wishlistGuid, productId} = payload

  let guid; 
  // if there is no existing guid, create one and respond with it
  if (!wishlistGuid) {
    guid = crypto.randomBytes(20).toString('hex');
    await wishlistSchema.create({guid, productId});
    return res.status(201).json({success: true, wishlistGuid: guid})
  }

  // if there is, an existing guid, save in db, check that existing db actually exists in db

  const existingGuid = await wishlistSchema.findOne({guid: wishlistGuid})

  console.log('existingGuid - ', existingGuid)
  console.log('wishlistGuid - ', wishlistGuid)
  if (wishlistGuid === existingGuid?.guid && productId !== existingGuid?.productId) {
    const wishlistProduct = await wishlistSchema.create({wishlistGuid, productId});
    console.log('wishlistProduct - ', wishlistProduct)
    return res.status(201).json({success: true, wishlistGuid})
  } else {
    // if wishlistGuid from client doesn't match any guid's in db
    return res.status(403).json({msg: 'Product already added to wishlist'})
  }

}

export const deleteWishlistProduct = async (req: any, res: any) => {
  const {id: productId} = req.params
  const wishlistProduct = await wishlistSchema.findOne({productId})
  if (!wishlistProduct) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }
  await wishlistProduct.deleteOne()
  res.status(200).json({msg: 'Item removed from your wishlist'})
}

export const getWishlistProduct = async (req: any, res: any) => {
  const {guid} = req.query

  console.log('guid - ', guid)

  const wishlistProducts = await wishlistSchema.find({guid})

  console.log('wishlistProducts with guid - ', wishlistProducts)

  res.status(200).json({wishlistProducts})

}

export const getAllWishlistProducts = async(req: any, res: any) => {
  const wishlistProduct = await wishlistSchema.find({});
  res.status(200).json({wishlistProduct})
}

export const deleteAllWishlistProducts = async(req: any, res: any) => {
  await wishlistSchema.deleteMany({})
  res.status(200).json({msg: 'products deleted'})
}
