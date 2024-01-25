import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "PKR 9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "PKR 3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "PKR 6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "PKR 14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];

const Review = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            PKR 34.06
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default Review;
