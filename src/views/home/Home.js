import React from "react";
import { Header } from "../../components/Header";
import HeroSection from "../../components/HeroSection";
import CategoryCard from "../../components/CategoryCard";

export const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <CategoryCard
        imageUrl="https://placekitten.com/400/200" // Replace with your image URL
        title="Card Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ctaText="Learn More"
      />
    </div>
  );
};
