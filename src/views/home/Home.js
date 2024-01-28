import React from "react";
import { Grid, Box, Container, Typography, Divider } from "@mui/material";
import { categoriesList } from "../../data/categories";
import { products } from "../../data/products";
import { HeroSection, ProductCard, CategoryCard } from "../../components";

export const Home = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      {/* HERO SECTION */}
      <HeroSection />

      <Container maxWidth="lg" sx={{ marginY: "2rem" }}>
        {/* CATEGORY SECTION */}

        <Divider color="light">
          <Typography
            sx={{
              typography: { xs: "h5", sm: "h4" },
            }}
          >
            CATEGORIES
          </Typography>
        </Divider>

        <Grid container spacing={2} sx={{ marginTop: "0" }}>
          {categoriesList.map((category) => {
            return (
              <Grid item xs={12} sm={4}>
                <CategoryCard
                  key={category.id}
                  imageUrl={category.url}
                  title={category.title}
                  description={category.description}
                  ctaText={category.ctaText}
                />
              </Grid>
            );
          })}
        </Grid>

        {/* PRODUCTS SECTION */}

        <Divider color="light" sx={{ marginTop: "2rem" }}>
          <Typography
            sx={{
              typography: { xs: "h5", sm: "h4" },
            }}
          >
            LATEST PRODUCTS
          </Typography>
        </Divider>

        <Grid container spacing={2} sx={{ marginY: "0.5rem" }}>
          {products?.map((product) => {
            return (
              <Grid item xs={6} sm={3}>
                <ProductCard key={product.id} item={product} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Container>
  );
};
