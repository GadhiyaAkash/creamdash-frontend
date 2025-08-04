import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";
import "./FilterSection.scss";

// Filter Section Component
const FilterSection = ({ filters, onFilterChange, onSortChange }) => {
  return (
    <div className="filter-section mb-4">
      <Row className="align-items-center">
        <Col md={6}>
          <div className="filter-controls">
            <Form.Select
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="me-3"
            >
              <option value="">All Categories</option>
              <option value="classic">Classic Flavors</option>
              <option value="premium">Premium</option>
              <option value="seasonal">Seasonal</option>
            </Form.Select>

            <Form.Select
              value={filters.priceRange}
              onChange={(e) => onFilterChange('priceRange', e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="0-10">$0 - $10</option>
              <option value="10-20">$10 - $20</option>
              <option value="20-30">$20 - $30</option>
              <option value="30+">$30+</option>
            </Form.Select>
          </div>
        </Col>

        <Col md={6}>
          <div className="sort-controls text-end">
            <Form.Select
              value={filters.sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              style={{ maxWidth: '200px', display: 'inline-block' }}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </Form.Select>
          </div>
        </Col>
      </Row>
    </div>
  );
};

FilterSection.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default FilterSection;