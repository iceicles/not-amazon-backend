const { isTokenValid } = require('../utils');

import CustomAPIError from "../errors";

/* middleware for /users */
const authenticateUser = async (req: any, res:any, next: any) => {
  // check if signed cookies is available
  const token = req.signedCookies.token;

  // no token - auth is invalid
  if (!token) {
    throw new CustomAPIError.UnauthenticatedError('Authentication Invalid');
  }

  // if token is present
  try {
    // check if it's valid
    const payload = isTokenValid({ token });
    // then save data in req.user to be used by routes /users
    req.user = {
      name: payload.name,
      userId: payload.userId,
      role: payload.role,
    };
    // console.log(payload);
    //then call next middleware (authorizePermissions)
    next();
  } catch (error) {
    throw new CustomAPIError.UnauthenticatedError('Authentication Invalid');
  }
};

/* authorizing user's based on role - admin/guest 
  {param} roles - spread operator 'roles' so we have multiple roles checked
*/
const authorizePermissions = (...roles: any) => {
  // returning a function to be used as a callback for express so we don't immediately invoking authorizePermissions func when calling it in the router (which we need to do)
  return (req: any, res: any, next: any) => {
    // req.user.role is passed from authenticateUser MW func
    if (!roles.includes(req.user.role)) {
      throw new CustomAPIError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next(); //then call next middleware (getAllUsers, etc)
  };
};

export default {
  authenticateUser,
  authorizePermissions
}