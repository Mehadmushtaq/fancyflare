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
  title: "here is dummy Title",
  price: 1599,
  salePrice: 899,
  description: "bla bla bla bla bla bla",
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
      <Grid container spacing={2} sx={{ minHeight: "60vh", padding: "2rem" }}>
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
          <Typography variant="h4">{item.title}</Typography>
          <Rating
            name="read-only"
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
          {item.salePrice ? (
            <>
              <Typography variant="h5">
                RS. {item.salePrice}
                <span style={{ textDecoration: "line-through" }}>
                  RS. {item.price}
                </span>
              </Typography>

              {/* </Badge> */}
            </>
          ) : (
            <Typography variant="h5">{item.price}</Typography>
          )}
          <Typography variant="h4">Details: {item.description}</Typography>
          <Typography variant="h4">Qty:</Typography>

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

          <Stack direction="row">
            <Button>Buy Now</Button>
            <Button>Add to Cart</Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
