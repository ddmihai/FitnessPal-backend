const express       = require('express');
const app           = express();
const cors          = require('cors');
app.use(cors())
app.use(express.json());


const router        = require('./router/router');



/* Add endpoints */
app.use('/api', router);

module.exports = app;