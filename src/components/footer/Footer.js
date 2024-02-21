import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Typography,
  Grid,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colors, fontsWeight } from '../../utils';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SubscribeForm from '../subscriptioin-form/SubscribeForm';
import LOGO from '../../assets/images/footer-logo.png';
import ContactForm from '../contact-form/ContactForm';
import { Link } from 'react-router-dom';

function StyledDetails({ label, title }) {
  return (
    <Typography>
      <span style={{ fontWeight: fontsWeight.fontBold }}>{label}</span>
      {title}
    </Typography>
  );
}

function CustomLink({ title, linkKey, link }) {
  return (
    <>
      {linkKey && (
        <Link
          to={`/products/${linkKey}`}
          style={{
            textDecoration: 'none',
            color: colors.colorBlack,
          }}
        >
          <Stack direction='row'>
            <NavigateNextIcon />
            <Typography>{title}</Typography>
          </Stack>
        </Link>
      )}

      {!linkKey && (
        <Stack direction='row'>
          <NavigateNextIcon />
          <Typography>{title}</Typography>
        </Stack>
      )}
    </>
  );
}

const CopyRightStyle = {
  backgroundColor: colors.lightGray,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'center',
};

export const Footer = () => {
  return (
    <Container
      disableGutters
      maxWidth='xl'
      sx={{ mt: 'auto', borderTop: '1px solid lightgrey' }}
    >
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={2}
          sx={{
            margin: '1rem 0',
            ' & .MuiPaper-root': {
              boxShadow: 0,
            },
            '& .MuiButtonBase-root.MuiAccordionSummary-root': {
              padding: 0,
              marginRight: '1rem',
            },
            '& .MuiAccordionSummary-content': {
              fontWeight: fontsWeight.fontBold,
            },
          }}
        >
          <Grid item xs={12} sm={4} md={3}>
            <Box>
              <img src={LOGO} width='50%' />
              <StyledDetails label='Call Us: ' title='03001034660' />
              <StyledDetails
                label='Email: '
                title='ayeshyefancyflare@gmail.com'
              />
              <StyledDetails
                label='Address: '
                title='Sargodha Road, Muslim Town, Faisalabad, Faisalabad 38000'
              />
            </Box>
          </Grid>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: 'none', sm: 'inline' },
              '& .MuiTypography-root': { mb: '0.5rem' },
            }}
          >
            <Typography style={{ fontWeight: fontsWeight.fontBold }}>
              Categories
            </Typography>
            <CustomLink title='Summer' linkKey={1} />
            <CustomLink title='Winter' linkKey={2} />
            <CustomLink title='Stiched' linkKey={3} />
            <CustomLink title='unStiched' linkKey={4} />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: { xs: 'inline', sm: 'none' },
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
              >
                INFORMATION
              </AccordionSummary>
              <AccordionDetails>
                <CustomLink title='link 1' />
                <CustomLink title='link 2' />
                <CustomLink title='link 3' />
                <CustomLink title='link 4' />
                <CustomLink title='link 5' />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: 'none', sm: 'inline' },
              '& .MuiTypography-root': { mb: '0.5rem' },
            }}
          >
            <Typography sx={{ fontWeight: fontsWeight.fontBold }}>
              IMPORTANT LINKS
            </Typography>
            <CustomLink title='Terms & Conditions' />
            <CustomLink title='Privacy Policy' />
            <CustomLink title='Return Policy' />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: { xs: 'inline', sm: 'none' },
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
              >
                CUSTOMER SUPPORT
              </AccordionSummary>
              <AccordionDetails>
                <CustomLink title='link 1' />
                <CustomLink title='link 2' />
                <CustomLink title='link 3' />
                <CustomLink title='link 4' />
                <CustomLink title='link 5' />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            sx={{
              '& .MuiTypography-root': { mb: '0.2rem' },
            }}
          >
            <Typography sx={{ fontWeight: fontsWeight.fontBold }}>
              SUBSCRIBE TODAY!
            </Typography>
            <Typography>Receive our latest updates</Typography>

            <SubscribeForm />
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
      {/* COPYRIGHT SECTION */}
      <Box sx={CopyRightStyle}>
        <Typography variant='body2' color='text.secondary'>
          {'© '}
          {new Date().getFullYear()}
          {' Ayeshye Fancy Flare. All Rights Reserved'}
        </Typography>
      </Box>{' '}
    </Container>
  );
};
