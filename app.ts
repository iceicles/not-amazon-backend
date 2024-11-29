
import dotenv from 'dotenv'
import cors from 'cors'
import { clerkMiddleware } from "@clerk/express";
import express from 'express';
import { Webhook } from 'svix';
import { connectDB } from './db/connect';
import productsRouter from './routes/products'

dotenv.config({path: `.env.local`})
dotenv.config()

const app = express()
const port = process.env.PORT || 4000


// checks request's cookies and headers for a session JWT
// and if found, attaches the Auth object to the request object under the auth key
app.use(clerkMiddleware())

// parse jasong matching 'application/json' content-type in request headers
// can't use this when using webhook route - https://docs.svix.com/receiving/verifying-payloads/how
// app.use(express.json());

//app.use(express.raw({ type: 'application/json' }));
// urlencoded parses incoming reqs and populates the request's body (req.body) by creating a new object containing the parsed data
//app.use(express.urlencoded({ extended: false }));

// allow cors
// TODO: figure out a better way to handle this in prod
app.use(cors());

app.use('/api/v1/products', productsRouter)

// TODO: place webhooks in separate folder
app.post(
  '/api/webhooks',
  // This is a generic method to parse the contents of the payload.
  // Depending on the framework, packages, and configuration, this may be
  // different or not required.
  // don't need this as i believe, app.use(express.json()); should help with parsing json
  // bodyParser.raw({ type: 'application/json' }), 
  express.raw({ type: 'application/json' }),
  

  async (req, res) => {
    const SIGNING_SECRET = process.env.SIGNING_SECRET



    if (!SIGNING_SECRET) {
      throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers and body
    const headers = req.headers
    const payload = req.body

    // Get Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return void res.status(400).json({
        success: false,
        message: 'Error: Missing svix headers',
      })
    }

    let evt: any

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code
    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id as string,
        'svix-timestamp': svix_timestamp as string,
        'svix-signature': svix_signature as string,
      })
    } catch (err: any) {
      console.log('Error: Could not verify webhook:', err.message)
      return void res.status(400).json({
        success: false,
        message: err.message,
      })
    }

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    // clerk *subscribed* events
    if (evt.type === 'user.created') {
      console.log('userId:', evt.data.id)
    }
    if (evt.type === 'user.updated') {
      console.log('userId:', evt.data.id)
    }

    return void res.status(200).json({
      success: true,
      message: 'Webhook received',
    })
  },
)

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

