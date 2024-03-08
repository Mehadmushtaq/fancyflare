import { Link } from 'react-router-dom';
import MegaMenu from '../components/mega-menu/MegaMenu';

export const menuItems = [
  {
    label: <Link to='/products'>New Arrival</Link>,
    key: 'newArrival',
  },
  {
    label: 'Summer',
    key: '1', //id of category
  },
  {
    label: 'Winter',
    key: '2',
  },
  {
    label: 'Stitched',
    key: '3',
  },
  {
    label: 'unStitched',
    key: '4',
  },
  {
    label: 'Others',
    key: 'others',
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
