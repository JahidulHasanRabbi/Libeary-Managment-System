import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { Box, Grid } from '@mui/material';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const OK = false

  return ( 
    <div>
      {OK ? (
        <div className='icon-center'> 
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
            <AccountCircleIcon sx={{ fontSize: 30 }}/>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          
        </div>
      ) : (
        <div className='login-s'>
                  <Grid container spacing={2}>
                  <Grid item>
                      <Link className='login_icon' href="/login">
                          <span>
                              Log In
                          </span>
                      </Link>
                  </Grid>
                  <Grid item>
              </Grid>
              </Grid>
            </div> )}
    </div>

      
  );
}