import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Divider,
  Skeleton,
} from "@mui/material";
import { categoriesList } from "../../data/categories";
import { products } from "../../data/products";
import {
  HeroSection,
  ProductCard,
  CategoryCard,
  ProductSkeleton,
} from "../../components";
import useProductApi from "../../hooks/use-product-api";

export const Home = () => {
  const { loading, latestProducts, getLatestProducts } = useProductApi();

  useEffect(() => {
    getLatestProducts();
  }, []);

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
              <Grid item xs={12} sm={4} key={category.id}>
                <CategoryCard
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
          {loading ? (
            <>
              {[...Array(8)].map((_, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <ProductSkeleton />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {latestProducts?.map((item) => {
                return (
                  <Grid item xs={6} sm={3} key={item.product.id}>
                    <ProductCard item={item} />
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      </Container>
    </Container>
  );
};
