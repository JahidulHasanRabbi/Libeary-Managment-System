import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Bookcard = ({ book }: any) =>{
  return (
    <Card>
      <CardMedia
        sx={{ width: 125, height: 200}}
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
      />

      <CardActions>
        <Button size="small">Borrow</Button>
      </CardActions>

    </Card>
  );
}

export default Bookcard;