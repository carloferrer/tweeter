"use strict";

// Basic express setup:
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Implementation of MongoDB below...
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);


  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

  // Close the connection to mongo when this node process terminates.
  function gracefulShutdown() {
    console.log("\nShutting down gracefully...");
    try {
      db.close();
    }
    catch (err) {
      throw err;
    }
    finally {
      console.log("Graceful shutdown successful!");
      process.exit();
    }
  }

  process.on('SIGTERM', gracefulShutdown); // listen for TERM signal (e.g., kill)
  process.on('SIGINT', gracefulShutdown);  // listen for INT signal (e.g., Ctrl-C)
});

