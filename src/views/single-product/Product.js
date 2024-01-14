import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const item = {
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 1599,
  salePrice: 899,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
};

export default function Product() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  return (
    <Container maxwidth="lg">
      <Grid
        container
        spacing={2}
        sx={{
          minHeight: "60vh",
          padding: "2rem",
          "& .MuiButtonBase-root.MuiIconButton-root": {
            backgroundColor: "lightgrey",
            borderRadius: "0px",
          },
        }}
      >
        <Grid item xs={12} sm={6}>
          <ImageGallery
            items={images}
            showNav={false}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">{item.title}</Typography>
          <Rating
            name="read-only"
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
          {item.salePrice ? (
            <>
              <Typography variant="h6">
                RS. {item.salePrice}
                <span
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "0.5rem",
                  }}
                >
                  RS. {item.price}
                </span>
              </Typography>
            </>
          ) : (
            <Typography variant="h5">{item.price}</Typography>
          )}
          <Typography variant="h6">Details: </Typography>
          <Typography variant="body1"> {item.description}</Typography>
          <Typography variant="h6">Qty:</Typography>

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

          <Stack direction="row" spacing={1} sx={{ marginY: "1rem" }}>
            <Button variant="contained">Buy Now</Button>
            <Button variant="contained">Add to Cart</Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
