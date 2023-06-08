import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const DashboardForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const fetchUserInformation = async () => {
        try {
          // Make API request to fetch user information
          const response = await fetch('/api/user');
          const data = await response.json();
    
          // Update state variables with fetched data
          setName(data.name);
          setEmail(data.email);
          setAddress(data.address);
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
    
      const handleAddressChange = (e) => {
        setAddress(e.target.value);
      };
    
      const handleSaveChanges = async () => {
        try {
          // Make API request to save the updated user information
          await saveUserInformation();
      
          // Toggle edit mode off and fetch updated user information
          setIsEditing(false);
          fetchUserInformation();
        } catch (error) {
          console.error('Error saving user information:', error);
        }
      };
    
    
      const saveUserInformation = async () => {
        try {
          // Make API request to save user information
          const response = await fetch('/api/user', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, address }),
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
    

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mt: 2 }}>
            <Typography variant="h5">Account Information</Typography>
            {isEditing ? (
                <>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" >Name</Typography>
                    <TextField
                        onChange={handleNameChange}
                        size="small"
                        sx={{ mt: 2, backgroundColor: 'white' }}                    />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Email</Typography>
                    <TextField
                        value={email}
                        onChange={handleEmailChange}
                        size="small"
                        sx={{ mt: 2, backgroundColor: 'white' }}
                    />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Address</Typography>
                    <TextField
                        value={address}
                        onChange={handleAddressChange}
                        size="small"
                        sx={{ mt: 2, backgroundColor: 'white' }}
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
                        onChange={handleNameChange}
                        size="small"
                        sx={{ mt: 2, backgroundColor: 'white' }}
                    />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Email</Typography>
                    <TextField
                        disabled
                        value={email}
                        onChange={handleEmailChange}
                        size="small"
                        sx={{ mt: 2, backgroundColor: 'white' }}
                    />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Address</Typography>
                    <TextField
                        disabled
                        value={address}
                        onChange={handleAddressChange}
                        size="small"
                        sx={{ mt: 2, backgroundColor: 'white' }}
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
}

export default DashboardForm;