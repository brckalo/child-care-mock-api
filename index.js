const express = require('express');
const cors = require('cors');

const constants = require('./constants');
const router = require('./routes');

require('dotenv').config();

const app = express();

const errorHandler = (error, req, res, next) => {
  res.status(error.status).json(error || constants.errors.somethingWentWrong);
}

app.use(cors());
app.use(express.json());
app.use('/api/v1', router);
app.use(errorHandler);

const port = process.env.SERVER_PORT || 8000;

app.listen(port, () => {
  console.log(`The mock server is listening on port ${port}`);
});
