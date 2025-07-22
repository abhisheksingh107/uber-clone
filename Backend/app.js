const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/user.routes");
const cookieParser = require('cookie-parser');
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/", userRoutes);



module.exports = app;