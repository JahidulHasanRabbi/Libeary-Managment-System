import { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PaymentIcon from '@mui/icons-material/Payment';
import LockIcon from '@mui/icons-material/Lock';
import DashboardForm from './form';
import BorrowBookForm from './book';
import Fines from './fine';
import ChangePassword from '../password';


const UserDashboard = () => {
    const [currentPage, setCurrentPage] = useState('DashboardForm');
    
    return (
        <Container maxWidth="lg">
        <Grid container spacing={3}>
        <Grid item xs={3}>
            <Box sx={{ height: '100%', borderRight: '1px solid black' }}>
            <List component="nav">
                <ListItem  onClick={() => setCurrentPage('DashboardForm')}>
                <ListItemButton>
                    <ListItemIcon>
                    <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account Information" />
                </ListItemButton>
                </ListItem>
                <ListItem  onClick={() => setCurrentPage('BorrowBookForm')}>
                <ListItemButton>
                    <ListItemIcon>
                    <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText primary="Borrowed Books" />
                </ListItemButton>
                </ListItem>
                <ListItem  onClick={() => setCurrentPage('Fines')}>
                <ListItemButton>
                    <ListItemIcon>
                    <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Fines" />
                </ListItemButton>
                </ListItem>
                <ListItem  onClick={() => setCurrentPage('ChangePassword')}>
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
        {currentPage === 'BorrowBookForm' && <BorrowBookForm />}
        {currentPage === 'ChangePassword' && <ChangePassword />}
        {currentPage === 'Fines' && <Fines />}
        </Grid>
        </Grid>
    </Container>
    );
};

export default UserDashboard;
