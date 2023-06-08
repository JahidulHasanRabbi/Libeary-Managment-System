import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alignProperty } from '@mui/material/styles/cssUtils';
import Link from 'next/link';

const Bookcard = ({ book }: any) =>{
  return (
    <Card className='card-container'>
      <Link href={`/books/${book.isbn}`}>
      <CardMedia
        sx={{ width: 125, height: 200 }}
        component="img"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
      />
      </Link>

      <CardActions className='card-action'>
        <Button variant="contained" fullWidth>Borrow</Button>
      </CardActions>

    </Card>
  );
}

export default Bookcard;