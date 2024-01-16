// Footer.js

import React from "react";
import { TextField, Button, InputAdornment } from "@mui/material";

const SubscribeForm = () => {
  const handleSubscribe = () => {
    // Handle subscribe logic here
    console.log("Subscribed!");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
      <TextField
        variant="outlined"
        label="Email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                disableElevation
                onClick={handleSubscribe}
                sx={{ borderRadius: "5rem" }}
              >
                Subscribe
              </Button>
            </InputAdornment>
          ),
          sx: { borderRadius: "5rem" },
        }}
      />
    </div>
  );
};

export default SubscribeForm;
