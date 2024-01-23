import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { colors } from "../../utils";

const productImages = [
  "https://i.pinimg.com/736x/a7/7f/a8/a77fa8b884c6a189fe8e67a0cfe3c031.jpg", // You can replace these with your actual image URLs
  "https://i.pinimg.com/originals/b6/88/1e/b6881e622c5ed78156c06706a62e2931.jpg",
  "https://i.pinimg.com/236x/bd/f9/01/bdf9019edf071c9feb0c0e1ef422f829.jpg",
  "https://i.pinimg.com/236x/bd/f9/01/bdf9019edf071c9feb0c0e1ef422f829.jpg",
];
const item = {
  title: "WINTER'23 MEN KAMEEZ SHALWAR PLAIN CHOCOLATE",
  price: 1599,
  salePrice: 899,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
};

export function Product() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const [selectedImage, setSelectedImage] = useState(productImages[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  /////////////// IMAGE MAGNIFIER //////////////////////////////

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseHover = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });

    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };

  return (
    <Container maxwidth="lg" disableGutters>
      <Grid
        container
        spacing={0}
        sx={{
          "& .MuiButtonBase-root.MuiIconButton-root": {
            backgroundColor: colors.lightMediumGray,
            borderRadius: "0px",
          },
          "& .MuiInputBase-root": {
            borderRadius: "0",
          },
        }}
      >
        <Grid item xs={12} sm={6} sx={{ padding: "0rem 1rem" }}>
          <Paper elevation={0}>
            {/* Main Image */}
            <Box
              sx={{
                height: { xs: "30rem", md: "40rem" },
                overflow: "hidden",
                position: "relative",
              }}
              onMouseEnter={() => setShowMagnifier(true)}
              onMouseLeave={() => setShowMagnifier(false)}
              onMouseMove={handleMouseHover}
            >
              <img
                src={selectedImage}
                alt="Main Product"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                  transition: "transform 0.3s ease-in-out",
                }}
              />

              {showMagnifier && (
                <Box
                  sx={{
                    position: "absolute",
                    left: `${cursorPosition.x - 100}px`,
                    top: `${cursorPosition.y - 100}px`,
                    pointerEvents: "none",
                    display: { xs: "none", sm: "inline" },
                  }}
                >
                  <Box
                    className="magnifier-image"
                    sx={{
                      width: "200px",
                      height: "200px",
                      backgroundImage: `url(${selectedImage})`,
                      backgroundPosition: `${position.x}% ${position.y}%`,
                    }}
                  />
                </Box>
              )}
            </Box>

            {/* Thumbnails */}
            <Grid container spacing={1} style={{ marginTop: "0.2rem" }}>
              {productImages.map((image, index) => (
                <Grid item xs={3} key={index}>
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "10rem",
                      objectFit: "cover",
                      objectPosition: "50% 50%",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onClick={() => handleImageClick(image)}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ padding: "1rem" }}>
          <Typography variant="h5">{item.title}</Typography>
          <Divider sx={{ marginBottom: "1rem" }} />

          <Rating
            name="read-only"
            defaultValue={2.5}
            precision={0.5}
            readOnly
            size="small"
            sx={{ color: "black" }}
          />

          {item.salePrice ? (
            <>
              <Typography variant="h6">
                <span
                  style={{
                    textDecoration: "line-through",
                  }}
                >
                  Rs. {item.price}
                </span>{" "}
                Rs. {item.salePrice}
              </Typography>
            </>
          ) : (
            <Typography variant="h4">{item.price}</Typography>
          )}

          <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                  <Stack direction="row">
                    <IconButton color="primary" onClick={handleDecrement}>
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      type="number"
                      value={quantity}
                      disabled
                      variant="outlined"
                      size="small"
                      inputProps={{
                        style: { textAlign: "center" },
                      }}
                    />
                    <IconButton color="primary" onClick={handleIncrement}>
                      <AddIcon />
                    </IconButton>
                  </Stack>
                </Grid>

                <Grid item xs={6} md={8}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    // onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                // onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </Grid>

            {/* DETAILS SECTION */}
            <TableContainer component={Container} sx={{ marginTop: "1rem" }}>
              <Typography variant="h6">Details: </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "30%", fontWeight: "bold" }}>
                      Color
                    </TableCell>
                    <TableCell style={{ width: "70%" }}>Black</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Size</TableCell>
                    <TableCell>2-Piece</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    <TableCell>Stiched</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
