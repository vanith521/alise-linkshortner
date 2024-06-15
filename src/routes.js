const express = require('express');
const router = express.Router();
const Url = require('./models');

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const url = new Url({ originalUrl });
  await url.save();
  res.json({ shortUrl: `${req.headers.host}/${url.shortUrl}` });
});

router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});

module.exports = router;
