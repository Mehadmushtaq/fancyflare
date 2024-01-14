import React from "react";
import CategoryCard from "../../components/category-card/CategoryCard";
import { HeroSection } from "./components";
import { Grid, Box, Container, Typography, Divider } from "@mui/material";
import { categoriesList } from "../../data/categories";
import { ProductCard } from "../../components/product-card/ProductCard";
import { products } from "../../data/products";

export const Home = () => {
  return (
    <Box>
      {/* <Header /> */}
      <HeroSection />

      <Container maxWidth="lg" sx={{ marginY: "2rem" }}>
        {/* CATEGORY SECTION */}

        <Divider color="light">
          <Typography variant="h4">CATEGORIES</Typography>
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
          <Typography variant="h4">LATEST PRODUCTS</Typography>
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
    </Box>
  );
};
