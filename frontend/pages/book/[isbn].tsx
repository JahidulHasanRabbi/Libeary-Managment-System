import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import Navbar from "@/component/navbar";

const containerStyles = {
  minHeight: "100vh",
  paddingTop: "1rem",
  paddingBottom: "1rem",
};

const bookCardStyles = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "1rem",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
};

const BookDetailsPage = () => {
  const router = useRouter();
  const { isbn } = router.query;
  const [bookDetails, setBookDetails] = useState('');
  const [authorInfo, setAuthorInfo] = useState('');

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
      const data = response.data;
      setBookDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAuthorInfo = async () => {
    if (bookDetails && bookDetails.authors && bookDetails.authors.length > 0) {
      try {
        const response = await axios.get(
          `https://openlibrary.org${bookDetails.authors[0].key}.json`
        );
        const authorData = response.data;
        setAuthorInfo(authorData);
      } catch (error) {
        // Handle the error if author information is not found
        console.log("Author information not found");
        setAuthorInfo({ name: "Unknown" }); // Set authorInfo to a default value
      }
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [isbn]);

  useEffect(() => {
    fetchAuthorInfo();
  }, [bookDetails]);

  return (
    <>
      <Navbar  title="Book Details"/>
      <Box style={containerStyles}>
        <Container maxWidth="md">
          <Box style={bookCardStyles}>
            {bookDetails ? (
              <>
                <Box display="flex" alignItems="center" marginBottom="2rem">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${bookDetails.covers}-L.jpg`}
                    alt={bookDetails.title}
                    style={{ maxHeight: "300px" }}
                  />
                  <Box marginLeft="2rem">
                    <Typography variant="h4" gutterBottom>
                      {bookDetails.title}
                    </Typography>
                    {bookDetails.authors && (
                      <Typography variant="subtitle1" gutterBottom>
                        Author: {authorInfo.name}
                      </Typography>
                    )}
                  </Box>
                </Box>
                {bookDetails.edition_count && (
                  <Typography variant="body1" gutterBottom>
                    Edition: {bookDetails.edition_count}
                  </Typography>
                )}
                {bookDetails.publish_date && (
                  <Typography variant="body1" gutterBottom>
                    Publish Date: {bookDetails.publish_date}
                  </Typography>
                )}
                {bookDetails.number_of_pages && (
                  <Typography variant="body1" gutterBottom>
                    Page Count: {bookDetails.number_of_pages}
                  </Typography>
                )}
                {bookDetails.subjects && (
                  <Typography variant="body1" gutterBottom>
                    Genre: {bookDetails.subjects.join(", ")}
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="h6">Loading book details...</Typography>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BookDetailsPage;
