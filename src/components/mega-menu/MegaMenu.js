import { Box } from '@mui/material';
import { Menu } from 'antd';
import { useProductApi } from '../../hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MegaMenu = () => {
  const { categories, getCategories } = useProductApi();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [current, setCurrent] = useState();
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent('');
    navigate(`/products/${e.key}`);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories) {
      const filtered = categories.filter(
        (category) => category.id < 1 || category.id > 4
      );
      setFilteredCategories(filtered);
    }
  }, [categories]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
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
        onClick={onClick}
        selectedKeys={[current]}
        items={
          filteredCategories &&
          filteredCategories.map((category) => ({
            label: category.name,
            key: category.id,
          }))
        }
      />
      {/* <Box>
        <img
          src='https://sameersain.pk/cdn/shop/products/728A2729.jpg?v=1649608059'
          width={150}
        />
      </Box> */}
    </Box>
  );
};

export default MegaMenu;
