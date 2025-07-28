const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const cookieParser = require('cookie-parser');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/captain", captainRoutes)



module.exports = app;