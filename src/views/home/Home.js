import React from "react";
import CategoryCard from "../../components/category-card/CategoryCard";
import { HeroSection } from "./components";
import { Grid, Box, Container } from "@mui/material";
import { categoriesList } from "../../data/categories";
import { ProductCard } from "../../components/product-card/ProductCard";
import { products } from "../../data/products";

export const Home = () => {
  return (
    <Box>
      {/* <Header /> */}
      <HeroSection />

      <Container maxWidth="lg">
        {/* CATEGORY SECTION */}
        <h2>CATEGORIES</h2>
        <Grid container spacing={2}>
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

        <h2>LATEST PRODUCTS</h2>

        {/* PRODUCTS SECTION */}
        <Grid container spacing={2}>
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
