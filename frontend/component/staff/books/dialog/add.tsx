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
  const [qty, setQty] = useState("");
  const [fecture, setFecture] = useState("no"); // Set default value to "no"
  const [authorInfo, setAuthorInfo] = useState(null);

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
        setAuthorInfo({ name: "Unknown" }); // Set authorInfo to a default value
      }
    };

    fetchAuthorInfo();
  }, [bookInfo.author]);

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

  if (!bookInfo) {
    return null; // Return null if bookInfo is null
  }

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
          value={authorInfo ? authorInfo.name : "Unknown"}
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
        />

        <TextField
          select
          label="Feature"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={(e) => setFecture(e.target.value)}
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

const AddBookDialog = ({ isOpen, onClose, onSave }) => {
  const [isbn13, setIsbn13] = useState("");
  const [bookInfo, setBookInfo] = useState(null);
  const [isBookInfoDialogOpen, setIsBookInfoDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.get(
        `https://openlibrary.org/isbn/${isbn13}.json`
      );
      const bookData = response.data;
      console.log("Book data:", bookData);
      const author = bookData.authors[0].key ? bookData.authors[0].key : "Author Not Found";
      const publisher = bookData.publishers ? bookData.publishers[0] : "Unknown";
      const edition = bookData.revision || "Unknown";
      const page = bookData.number_of_pages || "Unknown";
      const cover = bookData.covers
        ? `https://covers.openlibrary.org/b/id/${bookData.covers}-L.jpg`
        : "Unknown";
      const revision = bookData.revision || "Unknown";
      console.log("auhtor:", author)

      setBookInfo({
        isbn: bookData.isbn_13[0],
        title: bookData.title,
        author:author,
        publisher: bookData.publishers[0],
        edition: bookData.revision,
        page: bookData.number_of_pages,
        cover: `https://covers.openlibrary.org/b/id/${bookData.covers}-L.jpg`,
        revision: bookData.revision,
      });
      console.log("BookInfo:", bookInfo);

      setIsBookInfoDialogOpen(true);
    } catch (error) {
      console.log("Book information not found", error);
    } finally {
      setIsLoading(false); // Set loading state to false after search is complete
    }
  };
  console.log(isbn13);

  const handleCancelBookInfo = () => {
    setIsBookInfoDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <TextField
            label="ISBN"
            value={isbn13}
            onChange={(e) => setIsbn13(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSearch} color="primary" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress size={24} color="primary" />
            ) : (
              "Search"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {isBookInfoDialogOpen && (
        <BookInfoDialog
          isOpen={isBookInfoDialogOpen}
          bookInfo={bookInfo}
          onClose={handleCancelBookInfo}
        />
      )}

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress color="primary" />
        </div>
      )}
    </>
  );
};

export { AddBookDialog, BookInfoDialog };
