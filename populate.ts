// dynamically populate mongoDB with products.json

import dotenv from 'dotenv';
dotenv.config({ path: `.env.local` });
dotenv.config();
import { connectDB } from './db/connect';
import  productSchema  from './models/product';
import jsonProducts from './products.json';

const start = async () => {
  console.log('mongo uri - ', process.env.MONGO_URI);
  try {
    // connect to the database
    await connectDB(process.env.MONGO_URI || '');
    // remove any previous products present
    await productSchema.deleteMany();
    // create new products with jsonProducts
    await productSchema.create(jsonProducts);
    console.log('SUCCESS!!!');
    // exit node process with success code 0
    process.exit(0);
  } catch (error) {
    // log error
    console.log(error);
    // exit node process with fail code 1
    process.exit(1);
  }
};

start();
