
import 'express-async-errors'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express';
import { connectDB } from './db/connect';
import authRouter from './routes/auth'
import productsRouter from './routes/products'
import wishlistRouter from './routes/wishlist'
import cookieParser from 'cookie-parser'
import errorHandlerMW from './middleware/error-handler';
import notFoundMW from './middleware/not-found';

dotenv.config({path: `.env.local`})
dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); // signing cookies with JWT SECRET

// allow cors
const corsOptions = {
  origin: 'http://localhost:3000', // frontend url
  credentials: true, // allows cookies to be sent
}

// cors
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('<h1>Not-Amazon API</h1>');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/products/wishlist', wishlistRouter)

app.use(notFoundMW)
app.use(errorHandlerMW)


const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI || '')
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
}

start();

