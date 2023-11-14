// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// internal imports
const admin = require("./router/adminRouter");
// MongoDB connection setup
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connection successful! ------------------------------------------------------------------------------"))
    .catch((err) => console.log(err));

// routing setup
app.use("/admin", admin);

// Start the server
app.listen(process.env.PORT || 2000, () => {
    console.log(`app listening to port `, process.env.PORT || 2000);
});