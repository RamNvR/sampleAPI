const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const auth = require('./routes/authRoutes');
const project = require('./routes/project');
const config = require('./config/mongo');
const bodyParser = require('body-parser');
const cors = require('cors');
require('mongoose').connect(config.conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }))
    // parse application/json
    app.use(bodyParser.json())
    app.get('/', (_req, res) => res.send('working'));
    app.listen(port, () => console.log(`server running on ${port}`));
    app.use('/api/', auth);
    app.use('/project/', project);
}, err => {
    console.log(err);
});
