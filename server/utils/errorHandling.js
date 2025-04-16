export default function (error, req, res, next) {
    const statusCode = error.statusCode || 500;
    const payload = statusCode === 500 ? 'Internal server error' : error.errors || error.message || 'Internal server error';
    if (typeof payload === 'string') {
      res.status(statusCode).send(payload);
    } else {
      res.status(statusCode).json({
        success: false,
        errors: payload
      });
    }
  }