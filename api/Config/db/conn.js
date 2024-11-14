const mongoose = require('mongoose');
database = process.env.DB;

exports.connectDatabase = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("db connected successfully");
  }
  catch (error) {
    console.error("the following error occured:- " + error);
  }
}