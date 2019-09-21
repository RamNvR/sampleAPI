const express = require('express');
const app = express();
const port = process.argv[2] || 3000;

app.get('/', (_req, res) => res.send('working'));

app.listen(port, () => console.log(`server running on ${port}`));