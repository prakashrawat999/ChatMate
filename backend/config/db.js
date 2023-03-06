const mongoose = require("mongoose");
const colors = require('colors');

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error : ${error}`.red.bold);
        process.exit();
    }
};

module.exports = connectDB;