const app = require("./app");
const { connectCloudinary } = require("./Config/cloudinary");
const { connectDatabase } = require("./Config/db/conn");

connectDatabase();  //calling function to connect with database
connectCloudinary();

// listening the requests
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port `, process.env.PORT)
})