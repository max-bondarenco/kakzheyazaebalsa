const notFoundMiddleware = (req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found');
  }

module.exports = notFoundMiddleware