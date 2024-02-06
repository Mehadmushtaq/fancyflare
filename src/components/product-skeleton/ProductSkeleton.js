import { Box } from "@mui/material";
import { Skeleton } from "@mui/material";
import React from "react";

export function ProductSkeleton() {
  return (
    <Box>
      <Skeleton variant="rectangle" width="100%" height={280} />
      <Skeleton width={250} />
      <Skeleton width={150} />
      <Skeleton width={75} />
    </Box>
  );
}
