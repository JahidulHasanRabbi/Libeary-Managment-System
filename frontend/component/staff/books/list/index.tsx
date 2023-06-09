import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBookDialog from '../dialog';

const BookTable = ({ books, onDelete }) => {
  const [selectedBook, setSelectedBook] = React.useState(null);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedBook(null);
    setEditDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Added Date</TableCell>
            <TableCell>Page Count</TableCell>
            <TableCell>Revision</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.addedDate}</TableCell>
              <TableCell>{book.pageCount}</TableCell>
              <TableCell>{book.revision}</TableCell>
              <TableCell>{book.quantity}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(book)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(book)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedBook && (
        <EditBookDialog book={selectedBook} open={editDialogOpen} onClose={handleCloseDialog} />
      )}    </React.Fragment>
  );
};

export default BookTable;
