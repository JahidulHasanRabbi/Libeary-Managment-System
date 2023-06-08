import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";

const containerStyles = {
  backgroundColor: "#f5f5f5",
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

  useEffect(() => {
    if (isbn) {
      fetch(`https://openlibrary.org/isbn/${isbn}.json`)
        .then((response) => response.json())
        .then((data) => setBookDetails(data))
        .catch((error) => console.log(error));
    }
  }, [isbn]);

  console.log(bookDetails)

  return (
    <Box style={containerStyles}>
      <Container maxWidth="md">
        <Box style={bookCardStyles}>
          {bookDetails ? (
            <>
              <Box display="flex" alignItems="center" marginBottom="2rem">
                {bookDetails.covers && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${bookDetails.covers}-L.jpg`}
                    
                    alt={bookDetails.title}
                    style={{ maxHeight: "300px" }}
                  />
                )}
                <Box marginLeft="2rem">
                  <Typography variant="h4" gutterBottom>
                    {bookDetails.title}
                  </Typography>
                  {bookDetails.authors && (
                    <Typography variant="subtitle1" gutterBottom>
                      Author: {bookDetails.authors[0].name}
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
  );
};

export default BookDetailsPage;
