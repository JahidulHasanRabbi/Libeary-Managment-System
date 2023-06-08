import { Container, Grid, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Visibility, People, Description, LocationOn, Explore, Work } from '@mui/icons-material';

const FooterDesign = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#f5f5f5', py: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h6">
              <Box fontWeight="bold" fontSize="14px">
                First Section
              </Box>
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Visibility />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary="Vision" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary="Volunteer" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Description />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary="Blog" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary="Career" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">
              <Box fontWeight="bold" fontSize="14px">
                Second Section
              </Box>
            </Typography>
            <Typography variant="body2">
              <LocationOn fontSize="small" /> Address of the Library
              <br />
              City, Country
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">
              <Box fontWeight="bold" fontSize="14px">
                Third Section
              </Box>
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Description />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary="Site Documentation" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">
              <Box fontWeight="bold" fontSize="14px">
                Fourth Section
              </Box>
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Explore />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary="Discover" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FooterDesign;
