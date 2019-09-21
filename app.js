const express = require('express');
const app = express();
const port = process.argv[2] || 3000;
const auth = require('./routes/authRoutes');

app.get('/', (_req, res) => res.send('working'));

app.listen(port, () => console.log(`server running on ${port}`));
app.use('/api/', auth);