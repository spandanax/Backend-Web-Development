/**
 * logger middleware  [mount GLOBALLY in app.js]
 *
 * Logs the request METHOD, PATH, and STATUS.
 */

module.exports = function logger(req, res, next) {
  // Wait until the response is finished
  res.on('finish', () => {
    const id = req.id ? `[${req.id}] ` : '';

    console.log(
      `${id}${req.method} ${req.path} ${res.statusCode}`
    );
  });

  // Continue to the next middleware/route
  next();
};