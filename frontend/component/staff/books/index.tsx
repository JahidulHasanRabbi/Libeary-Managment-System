import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Typography,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookTable from "./list";
import { AddBookDialog, BookInfoDialog } from "./dialog/add";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/book/");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/book/search/?query=${searchQuery}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const handleQuantityChange = async (bookId, quantity) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/book/update/${bookId}/`, { qty: quantity });
      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          return { ...book, qty: quantity };
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error updating book quantity:", error);
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsEditDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setSelectedBook(null);
    setIsEditDialogOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/book/update/${selectedBook.id}/`, selectedBook);
      const updatedBooks = books.map((book) => {
        if (book.id === selectedBook.id) {
          return selectedBook;
        }
        return book;
      });
      setBooks(updatedBooks);
      setSelectedBook(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error saving book edit:", error);
    }
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setIsDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setSelectedBook(null);
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/book/delete/${selectedBook.id}/`);
      const updatedBooks = books.filter((book) => book.id !== selectedBook.id);
      setBooks(updatedBooks);
      setSelectedBook(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleAddBook = () => {
    setIsAddBookDialogOpen(true);
  };

  const handleCancelAddBook = () => {
    setIsAddBookDialogOpen(false);
  };

  const handleSaveAddBook = async (bookData) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/book/add/", bookData);
      setIsAddBookDialogOpen(false);
      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Book Search
      </Typography>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="contained" onClick={handleAddBook}>
        Add Book
      </Button>
      <TableContainer>
        <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} onQuantityChange={handleQuantityChange} />
      </TableContainer>

      <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AddBookDialog
        isOpen={isAddBookDialogOpen}
        onClose={handleCancelAddBook}
        onSave={handleSaveAddBook}
      />
    </Container>
  );
};

export default Books;
