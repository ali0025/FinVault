const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
require("dotenv").config();
const routes = require('./routes');

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);


// DB connect
const dbConnect = require("./config/database");
dbConnect(); 

// start server
app.listen(PORT, () => {
  console.log(`Server started successfully on http://localhost:${PORT}`);
});
