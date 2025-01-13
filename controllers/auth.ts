import userSchema from '../models/user'
import CustomAPIError from '../errors';
import { createTokenUser } from '../utils/createTokenUser';
import { attachCookiesToResponse } from '../utils/jwt';

const register = async (req: any, res: any) => {
  const { name, password, email } = req.body.userData;
  const emailAlreadyExists = await userSchema.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomAPIError.BadRequestError('Email already exists');
  }

  const user = await userSchema.create({ name, email, password, isAuthenticated: true });

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(201).json({ user: tokenUser });
};

const login = async (req: any, res: any) => {
  const { email, password } = req.body.userData;

  // if email or password is not inputed at all by user
  if (!email || !password) {
    throw new CustomAPIError.BadRequestError('Please provide email and password');
  }

  const user = await userSchema.findOne({ email });

  // check if user (using email since it has to be unique) exists in db
  if (!user) {
    throw new CustomAPIError.UnauthenticatedError('Invalid credentials');
  }

  // check if inputed password is correct
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomAPIError.UnauthenticatedError('Invalid credentials');
  }

  // attach cookie to response
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(200).json({ user: tokenUser });
};

const logout = async (req: any, res: any) => {
  // setting the same 'token' key in cookies to a different value (instead of JWT) for this route
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()), // expire the token value at that current time
  });
  // can simply send this - res.send('')
  res.status(200).json({ msg: 'user logged out' });
};


export {
  register,
  login,
  logout
}