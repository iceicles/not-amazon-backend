import wishlistSchema from '../models/wishlist'


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
  const wishlistProduct = await wishlistSchema.create(payload);
  console.log('wishlistProduct - ', wishlistProduct)
  res.status(201).json({success: true})
}

export const getAllWishlistProducts = async(req: any, res: any) => {
  const wishlistProduct = await wishlistSchema.find({});
  res.status(200).json({wishlistProduct})
}

export const deleteAllWishlistProducts = async(req: any, res: any) => {
  await wishlistSchema.deleteMany({})
  res.status(200).json({msg: 'products deleted'})
}
