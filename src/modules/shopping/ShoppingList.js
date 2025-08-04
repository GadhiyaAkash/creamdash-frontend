import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Col, Container, Row, Alert } from "react-bootstrap";
import PropTypes from 'prop-types';
import "./ShoppingList.scss";

// Import ice cream assets (using similar pattern to Dashboard)
import vanillaImage from "../../assets/service1.jpg";
import chocolateImage from "../../assets/service2.jpg";
import strawberryImage from "../../assets/service3.jpg";
import mintImage from "../../assets/service4.jpg";
import cookieImage from "../../assets/service5.jpg";
import rockyRoadImage from "../../assets/service6.jpg";
import butterscotchImage from "../../assets/service7.jpg";
import SectionHeader from "../../utilities/components/section-header/SectionHeader";
import FilterSection from "../../utilities/components/filter-section/FilterSection";
import ProductCard from "../../utilities/components/product-card/ProductCard";

// Main Shopping List Component
export const ShoppingList = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'name'
  });

  // Enhanced product data with ice cream theme
  const products = useMemo(() => [
    {
      id: 1,
      name: "Classic Vanilla Bean",
      price: 12.99,
      originalPrice: 15.99,
      image: vanillaImage,
      rating: 4.8,
      reviews: 324,
      description: "Rich and creamy vanilla ice cream made with real Madagascar vanilla beans.",
      isPopular: true,
      discount: 19,
      prepTime: "Ready to serve",
      size: "1 Pint",
      category: "classic"
    },
    {
      id: 2,
      name: "Dark Chocolate Delight",
      price: 14.99,
      image: chocolateImage,
      rating: 4.9,
      reviews: 256,
      description: "Indulgent dark chocolate ice cream with Belgian chocolate chunks.",
      isPopular: true,
      prepTime: "Ready to serve",
      size: "1 Pint",
      category: "classic"
    },
    {
      id: 3,
      name: "Fresh Strawberry Swirl",
      price: 13.99,
      originalPrice: 16.99,
      image: strawberryImage,
      rating: 4.7,
      reviews: 189,
      description: "Sweet strawberry ice cream with real fruit swirls and pieces.",
      discount: 18,
      prepTime: "Ready to serve",
      size: "1 Pint",
      category: "classic"
    },
    {
      id: 4,
      name: "Mint Chocolate Chip",
      price: 15.99,
      image: mintImage,
      rating: 4.6,
      reviews: 142,
      description: "Cool mint ice cream loaded with rich chocolate chips.",
      prepTime: "Ready to serve",
      size: "1 Pint",
      category: "classic"
    },
    {
      id: 5,
      name: "Cookies & Cream Supreme",
      price: 16.99,
      image: cookieImage,
      rating: 4.8,
      reviews: 298,
      description: "Vanilla ice cream packed with chocolate cookie pieces and cream.",
      isPopular: true,
      prepTime: "Ready to serve",
      size: "1 Pint",
      category: "premium"
    },
    {
      id: 6,
      name: "Rocky Road Adventure",
      price: 17.99,
      image: rockyRoadImage,
      rating: 4.5,
      reviews: 167,
      description: "Chocolate ice cream with marshmallows, almonds, and fudge swirls.",
      prepTime: "Ready to serve",
      size: "1 Pint",
      category: "premium"
    },
    {
      id: 7,
      name: "Salted Caramel Butterscotch",
      price: 18.99,
      originalPrice: 22.99,
      image: butterscotchImage,
      rating: 4.9,
      reviews: 203,
      description: "Creamy butterscotch ice cream with salted caramel ribbons.",
      discount: 17,
      prepTime: "Ready to serve",
      size: "1 Pint",
      category: "premium"
    },
    {
      id: 8,
      name: "Seasonal Berry Blast",
      price: 19.99,
      image: strawberryImage,
      rating: 4.4,
      reviews: 89,
      description: "Limited edition mixed berry ice cream with seasonal fruit pieces.",
      prepTime: "Ready to serve",
      size: "1 Pint",
      category: "seasonal"
    },
  ], []);

  // Product quantities state
  const [productQuantities, setProductQuantities] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {})
  );

  // Update cart count when product quantities change
  // useEffect(() => {
  //   const totalItems = Object.values(productQuantities).reduce((sum, qty) => sum + qty, 0);

  //   // Notify parent component about cart count update
  //   if (onUpdateCartCount) {
  //     onUpdateCartCount(totalItems);
  //   }
  // }, [productQuantities, onUpdateCartCount]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(p => p.replace('+', ''));
      filtered = filtered.filter(product => {
        if (max === '') return product.price >= parseFloat(min);
        return product.price >= parseFloat(min) && product.price <= parseFloat(max);
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    console.log("filtered::", filtered);

    return filtered;
  }, [products, filters]);

  const handleAddToCart = useCallback(async (product) => {
    
  }, []);

  const handleQuantityChange = useCallback((productId, quantity) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  }, []);

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const handleSortChange = useCallback((sortBy) => {
    setFilters(prev => ({
      ...prev,
      sortBy
    }));
  }, []);

  return (
    <div className="shopping-list-container">
      <Container fluid className="py-4">
        <SectionHeader
          title="Premium Ice Cream Collection"
          subtitle="Discover our handcrafted ice cream flavors made with the finest ingredients"
        />

        {/* Filter Section */}
        <FilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />

        {/* Products Grid */}
        <Row className="g-4">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuantityChange={handleQuantityChange}
                  productQuantities={productQuantities}
                />
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <div className="no-products text-center py-5">
                <h4>No products found</h4>
                <p className="text-muted">Try adjusting your filters to see more products.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ShoppingList;