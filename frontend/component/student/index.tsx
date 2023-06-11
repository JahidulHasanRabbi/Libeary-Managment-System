import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  marginTop: '7px',
  float: 'right',
});

const StyledFormControl = styled(FormControl)({
  margin: '5px',
});

const Student = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get('http://127.0.0.1:8000/api/user/', {
        params: {
          search: searchTerm,
        },
      })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleAddStudent = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserName('');
    setStudentName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const userData = {
      username: userName,
      name: studentName,
      email: email,
      password: password,
    };
  
    axios
      .post('http://127.0.0.1:8000/api/register/', userData)
      .then((response) => {
        setAlertMessage('Student added successfully');
        setOpen(false);
        fetchStudents();
        setUserName('');
        setStudentName('');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        setAlertMessage(`Failed to add student: ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Student List</h2>
      <TextField
        label="Search Student"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <StyledButton variant="contained" onClick={handleAddStudent}>
        Add Student
      </StyledButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Joined Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.date_joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
          <StyledFormControl fullWidth>
              <TextField
                label="User Name"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                variant="outlined"
              />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <TextField
                label="Student Name"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                variant="outlined"
              />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <TextField
                label="Email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <TextField
                label="Password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                helperText="Password must be at least 8 characters long."
              />
            </StyledFormControl>
            <DialogActions>
              <Button type="submit">Add Student</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {alertMessage && (
        <div>
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Student;
