const express = require('express');
const app = express();
const port = process.argv[2] || 8080;
const auth = require('./routes/authRoutes');
const project = require('./routes/project');
const config = require('./config/mongo');
const bodyParser = require('body-parser');
require('mongoose').connect(config.conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    app.use(bodyParser.urlencoded({ extended: true }))
    // parse application/json
    app.use(bodyParser.json())
    app.get('/', (_req, res) => res.send('working'));
    app.listen(port, () => console.log(`server running on ${port}`));
    app.use('/api/', auth);
    app.use('/project/', project);
});
