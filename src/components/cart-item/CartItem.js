import {
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

function CartItem() {
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };
  return (
    <Grid
      container
      sx={{
        padding: "1.5rem 1rem",
        border: "1px solid grey",
        borderRadius: "0.2rem",
        marginBottom: "1rem",
        "& .MuiGrid-root.MuiGrid-item": {
          margin: "auto",
        },
        "& .MuiTypography-root.MuiTypography-body1": {
          margin: "auto",
        },
        "& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-2": {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <Grid item xs={12} sm={5}>
        <Stack direction="row" spacing={2}>
          <Box
            component="img"
            src="https://i.pinimg.com/originals/b6/88/1e/b6881e622c5ed78156c06706a62e2931.jpg"
            sx={{
              width: 80,
              height: "auto",
            }}
          />
          <Typography sx={{ padding: "0.5rem" }}>
            WINTER'23 WOMEN EMBROIDERED JACQUARD
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Typography>PKR 3,983</Typography>
      </Grid>
      <Grid item xs={5} sm={2}>
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
      <Grid item xs={3} sm={2}>
        <Typography>PKR 3,983</Typography>
      </Grid>
      <Grid item sm={1}>
        <DeleteIcon />
      </Grid>
    </Grid>
  );
}

export default CartItem;
