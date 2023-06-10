import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CardMedia,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const BookInfoDialog = ({ isOpen, bookInfo, onClose }) => {

  const [qty, setQty] = useState('');
  const [fecture, setFecture] = useState('')
  const [authorInfo, setAuthorInfo] = useState(null);

  
  if (!bookInfo) {
    return null; // Return null if bookInfo is null
  }

  const handleSave = async () => {
    try {
      const bookData = {
        isbn: bookInfo.isbn,
        title: bookInfo.title,
        author: authorInfo.name,
        publisher: bookInfo.publisher,
        edition: bookInfo.edition,
        page: bookInfo.page,
        cover: bookInfo.cover,
        qty: qty,
        revision: bookInfo.revision,
        fecture: fecture,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/book/add/",
        bookData
      );

      console.log("Book saved successfully:", response.data);
      onClose(); // Close the dialog after saving
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org${bookInfo.author}.json`
        );
        const authorData = response.data;
        console.log("Author data:", authorData);
  
        setAuthorInfo(authorData);
      } catch (error) {
        // Handle the error if author information is not found
        console.log("Author information not found");
      }
    };
  
    if (bookInfo) {
      fetchAuthorInfo();
    }
  }, [bookInfo]);
  

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Book Information</DialogTitle>
      <DialogContent>
        <CardMedia component="img" alt="Book Cover" image={bookInfo.cover} />
        <TextField
          label="Title"
          value={bookInfo.title}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
        />
        <TextField
          label="Author"
          value={authorInfo.name}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
        />
        <TextField
          label="Page Count"
          value={bookInfo.page}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
        />
        <TextField
          label="Revision"
          value={bookInfo.revision}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
        />
        <TextField
          label="Quantity"
          onChange={(e) => setQty(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          // Make the quantity field editable
          // onChange={(e) => handleQuantityChange(bookInfo.id, e.target.value)}
        />
        
        <TextField
          select
          label="Feature"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={(e) => setFecture(e.target.value )}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookInfoDialog