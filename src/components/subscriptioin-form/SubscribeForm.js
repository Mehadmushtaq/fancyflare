// Footer.js

import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { AxiosClient } from "../../services";
import { useToast } from "../../hooks/useToast";

const SubscribeForm = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    const result = await AxiosClient.post("api/subscribers/post", email);
    if (result.status === 200) {
      toast.success("Subscribed Succesfuly");
    } else toast.error("Unable to subscribe. Try later!");
    setEmail("");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
      <TextField
        variant="outlined"
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
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
          sx: {
            borderRadius: "5rem",
            width: { xs: "90%", sm: "100%" },
          },
        }}
      />
    </div>
  );
};

export default SubscribeForm;
