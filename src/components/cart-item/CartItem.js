import { Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

function CartItem() {
  return (
    <Grid container maxWidth="lg" spacing={2}>
      <Grid item sm={5}>
        <Stack direction="row">
          <Typography>img</Typography>
          <Typography>title</Typography>
        </Stack>
      </Grid>
      <Grid item sm={2}>
        <Typography>PKR 3,983</Typography>
      </Grid>
      <Grid item sm={2}>
        <Stack direction="row">
          <IconButton color="primary" onClick={() => {}}>
            <RemoveIcon />
          </IconButton>
          <TextField
            type="number"
            // value={quantity}
            disabled
            variant="outlined"
            size="small"
            inputProps={{
              style: { textAlign: "center" },
            }}
          />
          <IconButton color="primary" onClick={() => {}}>
            <AddIcon />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item sm={2}>
        <Typography>PKR 3,983</Typography>
      </Grid>
      <Grid item sm={1}>
        <DeleteIcon />
      </Grid>
    </Grid>
  );
}

export default CartItem;
