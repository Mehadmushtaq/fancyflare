import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Badge, Container, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, Drawer } from 'antd';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { menuItems } from '../../data/menuItems';
import { MdPersonOutline, MdOutlineShoppingCart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext, useCartContext } from '../../context';
import { AccountMenu } from '../index';
import logo from '../../assets/images/logo.png';
import { colors, fontsWeight } from '../../utils';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const { count } = useCartContext();
  const navigate = useNavigate();
  const [current, setCurrent] = useState();

  const onClick = (e) => {
    console.log(e);
    if (e.key === 'MegaMenu') return;
    if (e.key === 'newArrival') {
      navigate('/products');
    } else {
      navigate(`/products/${e.key}`);
    }

    setCurrent('');
    setOpen(false);
  };

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Container disableGutters maxWidth='xl'>
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: 'center',
          px: { xs: '0.5rem', sm: '1rem', md: '2rem' },
          py: '0.5rem',
        }}
      >
        <Grid item xs={3}>
          <Stack
            direction='row'
            spacing={1}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
            }}
          >
            <WhatsAppIcon sx={{ height: '2rem', width: '2rem' }} />
            <Link
              to={`https://api.whatsapp.com/send?phone=${process.env.REACT_APP_WHATSAPP_CONTACT}`}
              target='_blank'
              rel='noopener noreferrer'
              style={{
                textDecoration: 'none',
                color: colors.colorBlack,
                fontWeight: fontsWeight.fontBold,
              }}
            >
              <Typography variant='body2'>
                {`+${process.env.REACT_APP_WHATSAPP_CONTACT}`}
              </Typography>
            </Link>
          </Stack>

          {/* HAMBURGER MENU FOR MOBILE */}
          <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>
            <MenuIcon
              style={{ height: '2rem', width: '2rem' }}
              onClick={showDrawer}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link to='/'>
            <img src={logo} alt='LOGO' width='auto' height='100vh' />
          </Link>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Stack direction='row' alignItems='center'>
            {isAuthenticated ? (
              <AccountMenu />
            ) : (
              <Link
                to='/login'
                style={{
                  textDecoration: 'none',
                  color: colors.colorBlack,
                  fontWeight: fontsWeight.fontBold,
                }}
              >
                <MdPersonOutline
                  style={{ height: '2rem', width: '2rem', marginTop: '0.3rem' }}
                />
              </Link>
            )}

            <Link
              to='/cart'
              style={{
                textDecoration: 'none',
                color: colors.colorBlack,
                fontWeight: fontsWeight.fontBold,
              }}
            >
              <Badge badgeContent={count} color='error'>
                <MdOutlineShoppingCart
                  style={{
                    height: '2rem',
                    width: '2rem',
                    marginLeft: '0.5rem',
                  }}
                />
              </Badge>
            </Link>
          </Stack>
        </Grid>
      </Grid>

      {/* MENU */}
      <Grid container sx={{ display: { xs: 'none', sm: 'inline' } }}>
        <Menu
          mode='horizontal'
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '1rem',
            fontFamily: ['Cinzel', 'Raleway', 'Open sans', 'Montserrat'],
          }}
          onClick={onClick}
          selectedKeys={[current]}
          items={menuItems}
        />
      </Grid>

      {/* MOBILE MENU */}
      <Drawer
        placement='left'
        width={200}
        closeIcon={false}
        onClose={onClose}
        open={open}
      >
        <Menu
          mode='inline'
          items={menuItems}
          selectedKeys={[current]}
          onClick={onClick}
        />
      </Drawer>
    </Container>
  );
};
