import jwt_decode from "jwt-decode";
import { DecodedJwtType } from "../types/DecodedJwtType";

const decodeJWT = (token?: string): DecodedJwtType | undefined => {
  return token ? jwt_decode(token) : undefined;
};

export default decodeJWT;
