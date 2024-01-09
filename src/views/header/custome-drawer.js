import * as React from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const CustomDrawer = styled(Box)(() => ({
  "& .ant-drawer-header": {
    padding: "0px",
    display: "none",
  },
}));
