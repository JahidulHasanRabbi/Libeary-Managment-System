import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import SearchBar from "./search";
import BasicMenu from "./menu";
import Home from "@/pages";
import Link from 'next/link';
import Head from 'next/head'
import { Helmet } from 'react-helmet'



const Navbar = ({ title}) => {
  return (
    <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <div className="navbar">
      <AppBar position="static">
        <Toolbar>
      <Grid container spacing={5}>
      <Grid item xs={4}>
        <Typography variant="h6">
          <div className="title">
            <Link href="/">
              <span>
                Hasan Library
              </span>
            </Link>
          </div>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <div className="search-bar">
          <SearchBar />
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className="menu">
          <BasicMenu />
        </div>
      </Grid>

    </Grid>
    </Toolbar>
      </AppBar>
    </div>
    </>
  );
};

export default Navbar;