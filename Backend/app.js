const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/user.routes");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})


app.use("/users", userRoutes);
app.use("/login", userRoutes);


module.exports = app;