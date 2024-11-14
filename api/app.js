const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const ErrorHandling = require("./middlewares/error");

dotenv.config({ path: './Config/config.env' });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const cors = require("cors");
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

//importing routes
const user = require("./router/userRoutes");
const blog = require("./router/blogRoutes");

//using routes
app.use("/api/v1/user", user);
app.use("/api/v1/blog", blog);
app.use('/api/v1/blog-cover', express.static(__dirname + '/uploads/blog_cover')); // route to  serve the static file(profile image in this project)

// Handle undefined routes
app.use((req, res, next) => {
    const error = new Error(`Cannot find Resource on this server!`);
    error.statusCode = 404;
    next(error);
});

//using error middlewares
app.use(ErrorHandling);


module.exports = app;
