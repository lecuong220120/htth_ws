const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.get('/fetch-html', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Missing URL parameter');
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const html = await page.content();
    await browser.close();

    res.send(html);
  } catch (error) {
    res.status(500).send(`Error fetching HTML: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Puppeteer service listening at http://localhost:${port}`);
});
