/**
 * timing middleware  [mount GLOBALLY in app.js]
 *
 * Logs how long the request took, in milliseconds.
 */

module.exports = function timing(req, res, next) {
  // Record the start time
  const start = Date.now();

  // Wait until the response is finished
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    const id = req.id ? `[${req.id}] ` : '';

    console.log(
      `${id}${req.method} ${req.path} took ${elapsed}ms`
    );
  });

  // Continue to the next middleware/route
  next();
};