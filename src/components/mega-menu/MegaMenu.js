import { Box } from "@mui/material";
import { Space, Menu } from "antd";

const MegaMenu = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Menu
        style={{ boxShadow: "none", border: "none", marginBottom:"1rem" }}
        items={[
          {
            label: "Refrigerators1",
            key: "Refrigerators1",
          },
          {
            label: "Refrigerators2",
            key: "Refrigerators2",
          },
          {
            label: "Refrigerators3",
            key: "Refrigerators3",
          },
          {
            label: "Refrigerators4",
            key: "Refrigerators4",
          },
          {
            label: "Refrigerators5",
            key: "Refrigerators5",
          },
          {
            label: "Refrigerators6",
            key: "Refrigerators6",
          },
          {
            label: "Refrigerators7",
            key: "Refrigerators7",
          },
          {
            label: "Refrigerators8",
            key: "Refrigerators8",
          },
        ]}
      />
      <Box>
        <img
          src="https://sameersain.pk/cdn/shop/products/728A2729.jpg?v=1649608059"
          width={200}
        />
      </Box>
    </Box>
  );
};

export default MegaMenu;
