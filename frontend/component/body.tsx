import { useEffect, useState } from "react";
import axios from "axios";
import Bookcard from "./Bookcard";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";

const fetchBooks = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/book/");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const Body = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };

    fetchData();
  }, []);

  return (
    <div className="main_body">
      <section className="card_section">
        <Grid container spacing={2}>
          {books.slice(0, 6).map((book) => (
            <Grid item md={2} key={book.id}>
              <Bookcard book={book} />
            </Grid>
          ))}
        </Grid>
      </section>
      <section className="card_section2">
        <Typography variant="h5" component="h4" gutterBottom>
          <span>Books We Love</span>
        </Typography>
      </section>
      <section className="card_section3">
        <Grid container spacing={2}>
          {books.slice(0, 6).map((book) => (
            <Grid item md={2} key={book.id}>
              <Bookcard book={book} />
            </Grid>
          ))}
        </Grid>
      </section>
      <section className="card_section4">
        <Box>
          <Link href="/chatbot">
            <img src="001.png" alt="" />
          </Link>
        </Box>
      </section>
    </div>
  );
};

export default Body;
