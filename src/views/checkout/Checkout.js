import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddressForm from "../../components/address-form/AddressForm";
import PaymentForm from "../../components/payment-form/PaymentForm";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export function Checkout() {
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");

  const handleChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };

  return (
    <Container maxWidth="lg" sx={{ my: "2rem" }}>
      <Typography variant="h4">Checkout</Typography>

      <Grid container spacing={2}>
        {/* LEFT SIDEBAR */}
        <Grid item sm={8} paddingRight="5rem">
          <AddressForm />

          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>

          <Accordion
            sx={{ my: "2rem" }}
            expanded={expandedAccordion === "creditCard"}
            onChange={handleAccordionChange("creditCard")}
          >
            <AccordionSummary>
              <FormControlLabel
                value="creditCard"
                control={
                  <Radio
                    checked={selectedPaymentMethod === "creditCard"}
                    onChange={handleChange}
                  />
                }
                label="Credit Card"
              />
            </AccordionSummary>
            <AccordionDetails>
              <PaymentForm />
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expandedAccordion === "cashOnDelivery"}
            onChange={handleAccordionChange("cashOnDelivery")}
          >
            <AccordionSummary>
              <FormControlLabel
                value="cashOnDelivery"
                control={
                  <Radio
                    checked={selectedPaymentMethod === "cashOnDelivery"}
                    onChange={handleChange}
                  />
                }
                label="Cash on Delivery"
              />
            </AccordionSummary>
          </Accordion>
        </Grid>
        <Grid item sm={4}>
          <Box
            sx={{
              maxHeight: "40vh",
              overflowY: "auto",
            }}
          >
            {/* PRODUCT */}
            <Stack direction="row" spacing={2} marginBottom="1rem">
              <Box
                component="img"
                src="https://i.pinimg.com/originals/b6/88/1e/b6881e622c5ed78156c06706a62e2931.jpg"
                sx={{
                  width: 50,
                  height: "auto",
                }}
              />
              <Typography variant="body2">
                WINTER'23 WOMEN EMBROIDERED JACQUARD
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} marginBottom="1rem">
              <Box
                component="img"
                src="https://i.pinimg.com/originals/b6/88/1e/b6881e622c5ed78156c06706a62e2931.jpg"
                sx={{
                  width: 50,
                  height: "auto",
                }}
              />
              <Typography variant="body2">
                WINTER'23 WOMEN EMBROIDERED JACQUARD
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} marginBottom="1rem">
              <Box
                component="img"
                src="https://i.pinimg.com/originals/b6/88/1e/b6881e622c5ed78156c06706a62e2931.jpg"
                sx={{
                  width: 50,
                  height: "auto",
                }}
              />
              <Typography variant="body2">
                WINTER'23 WOMEN EMBROIDERED JACQUARD
              </Typography>
            </Stack>
          </Box>
          <Box marginTop="2rem">
            <Stack direction="row" justifyContent="space-between">
              <Typography>Sub Total:</Typography>
              <Typography>PKR 3,983</Typography>
            </Stack>
            <Divider light sx={{ marginBottom: "1rem" }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Total:</Typography>
              <Typography>PKR 3,983</Typography>
            </Stack>
            <Divider light sx={{ marginBottom: "1rem" }} />

            <Button variant="contained" size="medium" sx={{ width: "100%" }}>
              Place Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
