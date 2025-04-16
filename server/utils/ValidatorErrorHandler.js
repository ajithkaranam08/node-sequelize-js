import { validationResult } from "express-validator";

export default function validatorErrorHandler(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const arrayErrors = Object.values(errors.mapped());
      arrayErrors.forEach((error) => {
        const msg = error.msg;
        if (typeof msg === 'string') {
          error.msg = res.__(error.msg) || error.msg;
        } else if (msg instanceof Array) {
          try {
            error.msg = res.__(error.msg[0], ...error.msg[1]) || error.msg;
          } catch (e) {
            logger.error('validatorErrorHandler set language failed:');
            logger.error(error.msg);
            logger.error(e);
          }
        }
        error.msg = res.__(error.msg) || error.msg;
      });
      return res.status(422).json({
        success: false,
        errors: arrayErrors,
      });
    }
    return next();
  }