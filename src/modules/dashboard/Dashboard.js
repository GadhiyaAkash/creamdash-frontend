import React from "react";
import { Container, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import "./Dashboard.scss";
import SectionHeader from "../../utilities/components/section-header/SectionHeader";
import AboutUs from "../../utilities/components/about-us/AboutUs";
import FeatureCards from "../../utilities/components/feature-cards/FeatureCards";
import ProductList from "../../utilities/components/product-list/ProductList";
import HeroSection from "../../utilities/components/hero-section/HeroSection";

// Main Dashboard Component
export const Dashboard = ({ onAddToCart, onUpdateCartCount, user = null }) => {

  return (
    <>
      <HeroSection user={user} />
      <div className="divider-image" aria-hidden="true"></div>

      <Container>
        {/* Features Section */}
        <section className="features">
          <SectionHeader
            title="Why Choose CreamDash?"
            subtitle="Discover the benefits of our premium ice cream delivery service."
          />
          <FeatureCards />
        </section>

        { /* Product List Section */}
        <section className="menu">
          <SectionHeader
            title="Popular Choices of the Week"
            subtitle="Discover our most loved flavors, crafted with premium ingredients and love."
          />
          <Row className="g-4">
            <ProductList
              onAddToCart={onAddToCart}
              onUpdateCartCount={onUpdateCartCount}
            />
          </Row>
        </section>

        { /* About Us Section */}
        <AboutUs />
      </Container>
    </>
  );
};

Dashboard.propTypes = {
  onAddToCart: PropTypes.func,
  onUpdateCartCount: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string
  })
};

Dashboard.defaultProps = {
  onAddToCart: () => { },
  onUpdateCartCount: () => { },
  user: null
};