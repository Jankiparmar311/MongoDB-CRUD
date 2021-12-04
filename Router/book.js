const express = require("express");
const router = express.Router();
router.use(express.json());
const bookModel = require("../models/book");


router.get("/", (req, res) => res.send("Welcome in Our Book Directory..!"));

//List Books
router.get("/list",async (req,res) => {
  const bookList = await bookModel.find({},{ book_id : true });

  if(bookList.length == 0){
    return res.json({ data: "no book in directory" });
  }

  return res.json({ data : bookList });
});

//Add Book
router.post("/addBook", (req, res) => {
  const { newBook } = req.body;
  bookModel.create(newBook);
  return res.json({ data: "Book added successfully "});
});


//update Book
router.put("/updateBook/:book_id",async (req,res) =>{
  const book_id = req.params.book_id;
  const title = req.body.title;
  const price = req.body.price;
  const author = req.body.author;
  const edition = req.body.edition;
  const category = req.body.category;

  const updateBook = await bookModel.findOneAndUpdate(
    { book_id : book_id},
    { price : price },
    { author : author },
    { edition : edition },
    { category : category },
    { new : true }
  );

  return res.json({ data: "Book update successfully "});
});


//delete Book
router.delete("/deleteBook/:book_id",async (req,res) =>{
  
  const deletedBook = await bookModel.findOneAndDelete({book_id : req.params.book_id});
  return res.json({ data: "Book deleted successfully "});
});


module.exports = router;
