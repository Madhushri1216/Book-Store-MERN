import express from "express";
import mongoose from "mongoose";
export const router = express.Router();
import { Book } from "../models/bookModel.js";

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  next(); // Proceed if ID is valid
};

// Post book
router.post("/", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    const addBook = await Book.create({
      title: title,
      author: author,
      publishYear: publishYear,
    });
    res.status(200).json(addBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get all books
router.get("/", async (req, res) => {
  try {
    const showBooks = await Book.find();
    res.status(200).json({
      count: showBooks.length,
      data: showBooks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get single book with validateObjectId middleware
router.get("/:id", validateObjectId, async (req, res) => {
  const { id } = req.params;

  try {
    const singleBook = await Book.findById(id); // Use id directly
    if (!singleBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(singleBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete book with validateObjectId middleware
router.delete("/:id", validateObjectId, async (req, res) => {
  const { id } = req.params;

  try {
    const deleteBook = await Book.findByIdAndDelete(id); // Use id directly
    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(deleteBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Update book with validateObjectId middleware
router.patch("/:id", validateObjectId, async (req, res) => {
  const { id } = req.params;

  try {
    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    }); // Use id directly
    if (!updateBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updateBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
