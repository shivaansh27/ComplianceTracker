const mongoose = require("mongoose");

let listenersAttached = false;

const attachConnectionListeners = () => {
  if (listenersAttached) return;

  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });

  mongoose.connection.on("disconnected", () => {
    console.error("MongoDB Disconnected");
  });

  mongoose.connection.on("error", (error) => {
    console.error(`MongoDB Error: ${error.message}`);
  });

  listenersAttached = true;
};

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("Error: MONGODB_URI is not set");
    process.exit(1);
  }

  attachConnectionListeners();

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
