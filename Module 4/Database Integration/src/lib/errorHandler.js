function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = Number.isInteger(error.statusCode)
    ? error.statusCode
    : 500;

  if (statusCode >= 500) {
    console.error('Request failed:', error);
  }

  const message = statusCode >= 500
    ? 'Internal server error'
    : error.message;

  return res.status(statusCode).json({ error: message });
}

module.exports = errorHandler;
