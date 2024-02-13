import MegaMenu from '../components/mega-menu/MegaMenu';

export const menuItems = [
  {
    label: 'Summer',
    key: 'Summer',
  },
  {
    label: 'Winter',
    key: 'winter',
  },
  {
    label: 'Cotton',
    key: 'cotton',
  },
  {
    label: 'New Arrivals',
    key: 'NewArrivals',
    children: [
      {
        label: <MegaMenu />,
        key: 'MegaMenu',
        style: {
          height: 'fit-content',
          backgroundColor: 'white',
          padding: '0rem 1rem',
        },
      },
    ],
  },
];
