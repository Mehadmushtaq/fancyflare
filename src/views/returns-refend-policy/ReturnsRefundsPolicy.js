import React, { useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@mui/material';

export const ReturnsRefundsPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Container maxWidth='lg' sx={{ padding: '3rem' }}>
      <Typography variant='h4' gutterBottom>
        Returns & Refunds Policy
      </Typography>

      <Typography variant='body1' gutterBottom>
        You are entitled to cancel your order within 3 days without giving any
        reason for doing so.
      </Typography>

      <Typography variant='body1' gutterBottom>
        The deadline for canceling an order is 3 days from the date you
        received the goods or on which a third party you have appointed, who is
        not the carrier, takes possession of the product delivered.
      </Typography>

      <Typography variant='body1' gutterBottom>
        In order to exercise your right of cancellation, you must inform us of
        your decision by means of a clear statement.
      </Typography>

      <Typography variant='body1' gutterBottom>
        You can inform us of your decision by emailing
        ayeshyefancyflare@gmail.com
      </Typography>

      <Typography variant='body1' gutterBottom>
        We will reimburse you no later than 3 days from the day on which we
        receive the returned goods. We will use the same means of payment as you
        used for the order, and you will not incur any fees for such
        reimbursement.
      </Typography>

      
      <br/>
      <Typography variant='h5' gutterBottom>
        Conditions for returns:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary='The goods were purchased in the last 3 days' />
        </ListItem>
        <ListItem>
          <ListItemText primary='The goods are in the original packaging' />
        </ListItem>
      </List>

      <Typography variant='body1' gutterBottom>
        The following goods cannot be returned:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary='The supply of goods made to your specifications or clearly personalized.' />
        </ListItem>
        <ListItem>
          <ListItemText primary='The supply of goods which according to their nature are not suitable to be returned, for example goods which deteriorate rapidly or where the date of expiry is over.' />
        </ListItem>
        <ListItem>
          <ListItemText primary='The supply of goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.' />
        </ListItem>
        <ListItem>
          <ListItemText primary='The supply of goods which are, after delivery, according to their nature, inseparably mixed with other items.' />
        </ListItem>
      </List>

      <Typography variant='body1' gutterBottom>
        We reserve the right to refuse returns of any merchandise that does not
        meet the above return conditions at our sole discretion.
      </Typography>

      <br />

      <Typography variant='h5' gutterBottom>
        Returning Goods:
      </Typography>

      <Typography variant='body1' gutterBottom>
        You are responsible for the cost and risk of returning the goods to us.
        You should send the goods to the following address:
      </Typography>

      <Typography variant='body1' gutterBottom>
        ayeshyefancyflare@gmail.com
      </Typography>

      <Typography variant='body1' gutterBottom>
        We cannot be held responsible for goods damaged or lost in return
        shipment. Therefore, we recommend an insured and trackable mail service.
        We are unable to issue a refund without actual receipt of the goods or
        proof of received return delivery. Refund is possible in one situation only, if the product is damaged or have some issues.
      </Typography>

      <br />
      <Typography variant='h5' gutterBottom>
        Gifts:
      </Typography>

      <Typography variant='body1' gutterBottom>
        If the goods were marked as a gift when purchased and then shipped
        directly to you, you'll receive a gift credit for the value of your
        return. Once the returned product is received, a gift certificate will
        be mailed to you.
      </Typography>

      <Typography variant='body1' gutterBottom>
        If the goods weren't marked as a gift when purchased, or the gift giver
        had the order shipped to themselves to give it to you later, We will
        send the refund to the gift giver.
      </Typography>

      <Typography variant='h6' gutterBottom>
        Contact Us:
      </Typography>

      <Typography variant='body1' gutterBottom>
        If you have any questions about our Returns and Refunds Policy, please
        contact us by email ayeshyefancyflare@gmail.com
      </Typography>
    </Container>
  );
};
