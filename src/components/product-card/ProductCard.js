import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Rating, Badge } from "@mui/material";
import { fontsWeight } from "../../utils";

export function ProductCard({ item }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={item.url}
          alt="green iguana"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {item.name}
          </Typography>
          <Rating
            name="read-only"
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />

          {item.salePrice ? (
            <>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: fontsWeight.fontSemiBold,
                }}
              >
                {item.salePrice}
                <span style={{ textDecoration: "line-through" }}>
                  {item.price}
                </span>
              </Typography>

              {/* </Badge> */}
            </>
          ) : (
            <Typography
              variant="body2"
              sx={{ fontWeight: fontsWeight.fontSemiBold }}
            >
              {item.price}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
