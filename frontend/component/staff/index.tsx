import { Container, Grid, Box, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';
import { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import DashboardForm from '../User/form';
import ChangePassword from '../password';
import Books from './books';
import Fine from './fine';
import Student from './student';
import Staff from './staff';

const StaffDashboard = () => {

  const [currentPage, setCurrentPage] = useState('DashboardForm');

  return (
    
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box sx={{ height: '100%', borderRight: '1px solid black' }}>
            <List component="nav">
              <ListItem onClick={() => setCurrentPage('DashboardForm')}>
              <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account Information" />
              </ListItemButton>
              </ListItem>
              <ListItem onClick={() => setCurrentPage('Books')}>
              <ListItemButton>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="Books" />
              </ListItemButton>
              </ListItem>
              <ListItem onClick={() => setCurrentPage('Students')}>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItemButton>
              </ListItem>
              <ListItem onClick={() => setCurrentPage('Staff')}>
              <ListItemButton>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Staff" />
              </ListItemButton>
              </ListItem>
              <ListItem onClick={() => setCurrentPage('Fine')}>
              <ListItemButton>
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText primary="Fine Management" />
              </ListItemButton>
              </ListItem>
              <ListItem onClick={() => setCurrentPage('ChangePassword')}>
              <ListItemButton>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item xs={9}>

        {currentPage === 'DashboardForm' && <DashboardForm />}
        {currentPage === 'Books' && <Books />}
        {currentPage === 'Students' && <Student />}
        {currentPage === 'Staff' && <Staff />}
        {currentPage === 'Fine' && <Fine />}
        {currentPage === 'ChangePassword' && <ChangePassword />}
          
        </Grid>
      </Grid>
    </Container>
  );
};

export default StaffDashboard;
