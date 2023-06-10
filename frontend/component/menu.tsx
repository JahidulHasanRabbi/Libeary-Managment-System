import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { Grid } from '@mui/material';
import { useCookies } from 'react-cookie';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [cookies, setCookie, removeCookie] = useCookies(['User', 'Role']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkCookie = () => {
    if (cookies.User) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeCookie('User');
    removeCookie('Role');
    router.push('/login');
  };
  const role = cookies.Role;

  const handleProfileClick = () => {
    if (role == 'user') {
      router.push('/student/Dashboard');
    } else if (role == 'staff') {
      router.push('/staff/dashboard');
    }
  };

  useEffect(() => {
    checkCookie();
  }, [cookies.User, handleClick]);


  if (!isLoggedIn) {
    return (
      <div className="login-s">
        <Grid container spacing={2}>
          <Grid item>
            <Link className="login_icon" href="/login">
              <span>Log In</span>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (isLoggedIn) {

    return (
      <div className="icon-center">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon sx={{ fontSize: 30 }} />
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
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
