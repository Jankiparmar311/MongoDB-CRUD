require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURL)
.then(()=>console.log("MongoDB connected"));

const book_r=require("./Router/book.js");
app.use("/book",book_r);

app.get("/", (req, res) => res.send("Welcome in Our Book Directory..!"));

app.listen(port, () => console.log(`server running on port 5000`));

