import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import SearchBar from "./search";
import BasicMenu from "./menu";



const Navbar = () => {
  return (
    <div className="navbar">
      <AppBar position="static">
        <Toolbar>
      <Grid container spacing={5}>
      <Grid item xs={4}>
        <Typography variant="h6">
          <div className="title">
            <span>
              Hasan Library
            </span>
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
  );
};

export default Navbar;