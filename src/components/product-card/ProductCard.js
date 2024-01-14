import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Rating, Box } from "@mui/material";
import { fontsWeight } from "../../utils";

export function ProductCard({ item }) {
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        overflow: "visible",
        border: "1px solid lightgrey",
      }}
    >
      {/* SALE BADGE */}
      {item?.salePrice ? (
        <Box
          sx={{
            width: "50px",
            height: "50px",
            backgroundColor: "red",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: "1",
            top: "-10px",
            right: "-10px",
          }}
        >
          <Typography>Sale</Typography>
        </Box>
      ) : (
        " "
      )}

      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
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
          <Typography gutterBottom variant="h6">
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
              <Typography variant="body1">
                {item.salePrice}
                <span
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "0.5rem",
                  }}
                >
                  {item.price}
                </span>
              </Typography>
            </>
          ) : (
            <Typography variant="body1">{item.price}</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
