import { useCallback, useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import ProductCard from '../product-card/ProductCard';
import { PRODUCT_LIST } from './ProductListConst';

const ProductList = () => {
    const products = PRODUCT_LIST;
    return (
        <>
            {products.map((product) => (
                <Col key={product.id} xl={3} lg={4} md={6} sm={6} xs={12} className="mb-4">
                    <ProductCard
                        product={product}
                    />
                </Col>
            ))}
        </>
    );
}

export default ProductList;