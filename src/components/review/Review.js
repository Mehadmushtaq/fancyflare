import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useCartContext } from '../../context';

const Review = () => {
  const { items, totalPrice } = useCartContext();

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={`${item.product.name} (${item.quantity} items)`}
              secondary={`color: ${item.product.color} size: ${item.product.size}`}
            />
            <Typography variant='body2'>{item.totalPrice}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            PKR {totalPrice}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default Review;
