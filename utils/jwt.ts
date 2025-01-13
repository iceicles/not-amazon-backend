import jwt from 'jsonwebtoken'

import { JWTSignature } from '../interface/JWTSig'

// create jwt access token
const createJWT = ({ payload }: {payload: JWTSignature}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

// check if access token is valid
const isTokenValid = ({ token }: {token: any}) => jwt.verify(token, process.env.JWT_SECRET as string);

// sending both access and refresh tokens in response
const attachCookiesToResponse = ({ res, user }: {res: any, user: JWTSignature}) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;
  // set token in cookies - https://expressjs.com/en/api.html#res.cookie
  res.cookie('token', token, {
    httpOnly: true, // cookie can only be set/modified by (set-cookie) from server not document.cookie
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production', // secure (http*S*) only in prod
    signed: true,
  });
};

export {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
