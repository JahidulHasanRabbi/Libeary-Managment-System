import { useEffect, useState } from "react";
import Bookcard from "./Bookcard";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Grid } from "@mui/material";



const Body = () => {

    
    const [todo, setTodo] = useState(null);

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setTodo(data))
        .catch(error => console.log(error));
    }, []);


    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <item>
                    {todo && todo.map((book: any) => (
                <Bookcard book={book} />
            ))
            }
                    </item>
                    </Grid>
            </Grid>
        </div>
    )
}

export default Body
