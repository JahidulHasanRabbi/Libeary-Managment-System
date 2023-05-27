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
        <div >
            <Grid container spacing={2}>
                    {todo && todo.map((book: any) => (
                    <Grid item xs={8}>
                        <Bookcard book={book} />
                    </Grid>
                        ))
                    }
                    
            </Grid>
        </div>
    )
}

export default Body
