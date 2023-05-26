import { useEffect, useState } from "react";
import Bookcard from "./Bookcard";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'



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
            {todo && todo.map((book: any) => (
                <Bookcard book={book} />
            ))
            }
        </div>
    )
}

export default Body
