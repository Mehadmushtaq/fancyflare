import MegaMenu from "../components/mega-menu/MegaMenu";

export const menuItems = [
  {
    label: "Women",
    key: "women",
  },
  {
    label: "Men",
    key: "men",
  },
  {
    label: "Kids",
    key: "kids",
  },
  {
    label: "New Arrivals",
    key: "NewArrivals",
    children: [
      {
        label: <MegaMenu />,
        key: "MegaMenu",
        style: {
          height: "fit-content",
          backgroundColor: "white",
          padding: "0rem 1rem",
        },
      },
    ],
  },
  {
    type: "divider",
  },
];
