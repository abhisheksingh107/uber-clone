const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const app = require("./app");
const connectDB = require('./db/db');
const port = process.env.PORT || 3000;
const server = http.createServer(app);


process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    process.exit(1);
});

connectDB().then(() => {
    console.log("Connection is established....");
    server.listen(port, () => {
        console.log(`server is running on ${port}`)
    });

}).catch((err) => {
    console.log("Connection can't be established...  " + err.message);
    process.exit(1);
})

