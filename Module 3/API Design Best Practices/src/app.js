const express = require('express');
const postRoutes = require('./routes/postRoutes');
const { resetData } = require('./data/postStore');
const controller = require('./controllers/postController');

function createApp() {
  const app = express();

  app.use(express.json());

  app.use('/', postRoutes);

  // Safe internal failure route
  app.get('/explode', controller.explode);

  // Central error handler
  app.use((err, req, res, next) => {
    console.error(err);

    const status = err.statusCode || 500;
    const code = err.code || 'INTERNAL_ERROR';

    let message = 'Something went wrong';

    if (status === 400) {
      message = err.message || 'Bad Request';
    }

    if (status === 404) {
      message = err.message || 'Not Found';
    }

    res.status(status).json({
      error: {
        code,
        message
      }
    });
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = 3000;

  app.listen(port, () => {
    console.log(`Starter API listening on port ${port}`);
  });
}

module.exports = {
  createApp,
  resetData
};