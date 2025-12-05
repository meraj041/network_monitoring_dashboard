const express = require('express');
const cors = require('cors');
const ping = require('ping');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const hosts = ['8.8.8.8', '1.1.1.1'];

app.get('/ping', async (req, res) => {
  const results = await Promise.all(
    hosts.map(async (host) => {
      const result = await ping.promise.probe(host);
      return { host, time: result.time };
    })
  );
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
