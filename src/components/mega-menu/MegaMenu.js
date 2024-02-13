import { Box } from '@mui/material';
import { Space, Menu } from 'antd';

const MegaMenu = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        paddingY: '1rem',
        justifyContent: 'space-between',
      }}
    >
      <Menu
        style={{
          boxShadow: 'none',
          border: 'none',
          marginBottom: '1rem',
          width: '20vh',
        }}
        items={[
          {
            label: 'New Arrivals 1',
            key: 'Refrigerators1',
          },
          {
            label: 'New Arrivals 2',
            key: 'Refrigerators2',
          },
          {
            label: 'New Arrivals 3',
            key: 'Refrigerators3',
          },
          {
            label: 'New Arrivals 4',
            key: 'Refrigerators4',
          },
          {
            label: 'New Arrivals 5',
            key: 'Refrigerators5',
          },
        ]}
      />
      <Box>
        <img
          src='https://sameersain.pk/cdn/shop/products/728A2729.jpg?v=1649608059'
          width={150}
        />
      </Box>
    </Box>
  );
};

export default MegaMenu;
