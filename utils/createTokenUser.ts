import { IUserSchema } from "../interface/user";
import { JWTSignature } from "../interface/JWTSig";


export const createTokenUser = (user: IUserSchema): JWTSignature => {
  return { name: user.name, userId: user._id};
};

