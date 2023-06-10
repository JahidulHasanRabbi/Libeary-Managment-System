import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const DashboardForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserInformation();
  }, []);

  const fetchUserInformation = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        headers: {
          'Authorization': `Bearer ${getCookie('User')}`
        }
      });
      const data = await response.json();

      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      await saveUserInformation();
      setIsEditing(false);
      fetchUserInformation();
    } catch (error) {
      console.error('Error saving user information:', error);
    }
  };

  const saveUserInformation = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile/update/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('User')}`
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        console.log('User information saved successfully.');
      } else {
        console.error('Error saving user information.');
      }
    } catch (error) {
      console.error('Error saving user information:', error);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5">Account Information</Typography>
        {isEditing ? (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Name</Typography>
                <TextField
                  onChange={handleNameChange}
                  value={name}
                  size="small"
                  sx={{ mt: 2, backgroundColor: 'white', color: 'black' }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Email</Typography>
                <TextField
                  onChange={handleEmailChange}
                  value={email}
                  size="small"
                  sx={{ mt: 2, backgroundColor: 'white', color: 'black' }}
                />
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Name</Typography>
                <TextField
                  disabled
                  value={name}
                  size="small"
                  sx={{ mt: 2, backgroundColor: 'white', color: 'black' }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Email</Typography>
                <TextField
                  disabled
                  value={email}
                  size="small"
                  sx={{ mt: 2, backgroundColor: 'white', color: 'black' }}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        {isEditing ? (
          <Button onClick={handleSaveChanges}>Save</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </Box>
    </Box>
  );
};

export default DashboardForm;
