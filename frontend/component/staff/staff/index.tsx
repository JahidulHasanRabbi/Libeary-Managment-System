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

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [staffName, setStaffName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = () => {
    axios
      .get('http://127.0.0.1:8000/api/user/staff/', 
    )
      .then((response) => {
        setStaffMembers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStaffMembers();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleAddStaff = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserName('');
    setStaffName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const staffData = {
      username: userName,
      name: staffName,
      email: email,
      password: password,
    };

    axios
      .post('http://127.0.0.1:8000/api/register/staff/', staffData)
      .then((response) => {
        setAlertMessage('Staff member added successfully');
        setOpen(false);
        fetchStaffMembers();
        setUserName('');
        setStaffName('');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        setAlertMessage(`Failed to add staff member: ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Staff List</h2>
      <TextField
        label="Search Staff"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <StyledButton variant="contained" onClick={handleAddStaff}>
        Add Staff
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
            {staffMembers.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.date_joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Staff</DialogTitle>
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
                label="Staff Name"
                required
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
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
              <Button type="submit">Add Staff</Button>
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

export default Staff;
