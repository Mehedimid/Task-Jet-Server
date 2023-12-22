require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// == middleware ==
app.use(cors());
app.use(express.json());


// __________________________________________________________________________________
app.get("/", (req, res) => {
    res.send("assignmetn 12 api running");
  });
  
  app.listen(port, () => {
    console.log(`assignment-12 is running on port ${port}`);
  });