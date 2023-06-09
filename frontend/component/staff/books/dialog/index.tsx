import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditBookDialog = ({ book, open, onClose }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [pageCount, setPageCount] = useState(book.pageCount);
  const [revision, setRevision] = useState(book.revision);
  const [quantity, setQuantity] = useState(book.quantity);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handlePageCountChange = (event) => {
    setPageCount(event.target.value);
  };

  const handleRevisionChange = (event) => {
    setRevision(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSave = () => {
    // Implement the save functionality to update the book information
    const updatedBook = {
      ...book,
      title,
      author,
      pageCount,
      revision,
      quantity,
    };

    console.log('Updated book:', updatedBook);

    // Close the dialog
    onClose();
  };

  const handleCancel = () => {
    // Close the dialog without saving any changes
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Edit Book</DialogTitle>
      <DialogContent>
        <TextField label="Title" value={title} onChange={handleTitleChange} fullWidth margin="normal" />
        <TextField label="Author" value={author} onChange={handleAuthorChange} fullWidth margin="normal" />
        <TextField
          label="Page Count"
          value={pageCount}
          onChange={handlePageCountChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Revision"
          value={revision}
          onChange={handleRevisionChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
          fullWidth
          margin="normal"
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookDialog;
