import jwt from "jsonwebtoken";
import { AUTH_ERRORS } from "../constant";

export function isAuthorized(checkPermission) {
    return async (req, res, next) => {
      try {
        const authorization = req.header('Authorization');
        const role = req.header('Role');
        if (typeof authorization !== 'string') {
          return next(new APIError(401, AUTH_ERRORS.UNAUTHORIZED));
        }
        const authorizationArray = authorization.split(' ');
        if (authorizationArray[0] === 'Bearer') {
          const token = authorizationArray[1];
          let userData;
          try {
            userData = jwt.verify(token, USER_JWT_SECRET_KEY);
          } catch (error) {
            return next(new APIError(401, AUTH_ERRORS.UNAUTHORIZED));
          }
       
          req.auth = await User.findOne(
            { _id: userData._id },
            '_id type fullName firstName lastName email status forgotPasswordInfo courseCentre'
          );
  
          if (!req.auth) {
            return next(new APIError(401, AUTH_ERRORS.UNAUTHORIZED));
          }
          if (req.auth.status !== USER_STATUS.ACTIVE) {
            return next(new APIError(401, AUTH_ERRORS.UNAUTHORIZED));
          }
          req.role = role;
          return next();
        }
        return next(new APIError(401, AUTH_ERRORS.UNAUTHORIZED));
      } catch (error) {
        logger.error(`User validation error: ${error}`);
        return next(new APIError(500, 'Internal server error'));
      }
    };
  }