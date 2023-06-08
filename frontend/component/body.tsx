import { useEffect, useState } from "react";
import Bookcard from "./Bookcard";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";



const Body = () => {
    
    const [todo, setTodo] = useState(null);

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setTodo(data))
        .catch(error => console.log(error));
    }, []);


    return (
        <div className='main_body'>
            <section className="card_section">
                <Grid  container spacing={2}>
                        {todo && todo.slice(0, 6).map((book: any) => (
                        <Grid item  md={2} key={book.id} >
                            <Bookcard book={book} />
                        </Grid>
                            ))
                        }
                        
                </Grid>
            </section>.
            <section className="card_section2">
                <Typography variant="h5" component="h4" gutterBottom>
                      <span>
                        Books We Love
                      </span>
                </Typography>
            </section>
            <section className="card_section3">
                <Grid  container spacing={2}>
                        {todo && todo.slice(0, 6).map((book: any) => (
                        <Grid item  md={2} key={book.id} >
                            <Bookcard book={book} />
                        </Grid>
                            ))
                        }
                        
                </Grid>
            </section>.
            <section className="card_section4">
            <Box   >
                <Link href="/books">
                <img src="001.png" alt="" />
                </Link>
            </Box>
            </section>
        </div>
    )
}

export default Body
