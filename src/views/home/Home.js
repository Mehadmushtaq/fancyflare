import React from "react";
import CategoryCard from "../../components/category-card/CategoryCard";
import { HeroSection } from "./components";
import { Grid } from "@mui/material";

export const Home = () => {
  return (
    <div>
      {/* <Header /> */}
      {/* <HeroSection /> */}

      {/* CATEGORY SECTION */}
      <Grid container spacing={2} sx={{ padding: "5rem" }}>
        <Grid item xs={6} sm={4}>
          <CategoryCard
            imageUrl="https://placekitten.com/400/200" // Replace with your image URL
            title="Card Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ctaText="Learn More"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <CategoryCard
            imageUrl="https://placekitten.com/400/200" // Replace with your image URL
            title="Card Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ctaText="Learn More"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <CategoryCard
            imageUrl="https://placekitten.com/400/200" // Replace with your image URL
            title="Card Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ctaText="Learn More"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <CategoryCard
            imageUrl="https://placekitten.com/400/200" // Replace with your image URL
            title="Card Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ctaText="Learn More"
          />
        </Grid>
      </Grid>
    </div>
  );
};
