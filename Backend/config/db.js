// db.js

const mongoose = require("mongoose");

const dburl = "mongodb+srv://shaniranasinghe2001:1234@cluster0.jv0rm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", true);

const connection = async () => {
    try {
        await mongoose.connect(dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("Database connection error:", e.message);
        process.exit(1);
    }
};

module.exports = connection;
