import { useState, useCallback, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ShoppingList.scss";
import SectionHeader from "../../utilities/components/section-header/SectionHeader";
import FilterSection from "../../utilities/components/filter-section/FilterSection";
import ProductCard from "../../utilities/components/product-card/ProductCard";
import { DEFAULT_FILTERS, PRODUCT_LIST } from "../../utilities/components/product-list/ProductListConst";
import useProductUtils from "../../hooks/useProductUtils";

// Main Shopping List Component
export const ShoppingList = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [products, setProducts] = useState(PRODUCT_LIST.map(p => ({ ...p, quantity: 0 })));
  const { updateProductQuantityToCart } = useProductUtils();

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
    return filtered;
  }, [products, filters]);

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

  const handleUpdateQuantity = useCallback((productId, newQuantity) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      updateProductQuantityToCart(product, newQuantity);
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === productId ? { ...p, quantity: newQuantity } : p
        )
      );
    }
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
                  onQuantityChange={handleUpdateQuantity}
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