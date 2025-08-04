import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import ProductCard from '../product-card/ProductCard';
import vanillaImage from "../../../assets/service1.jpg";
import chocolateImage from "../../../assets/service2.jpg";
import strawberryImage from "../../../assets/service3.jpg";
import mintImage from "../../../assets/service4.jpg";
import cookieImage from "../../../assets/service5.jpg";
import PropTypes from 'prop-types';

const ProductList = ({ onAddToCart, onUpdateCartCount }) => {
    const [isLoading, setIsLoading] = useState(false);

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
    ], []);

    const [productQuantities, setProductQuantities] = useState(
        products.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {})
    );

    // Update cart count when product quantities change
    useEffect(() => {
        const totalItems = Object.values(productQuantities).reduce((sum, qty) => sum + qty, 0);
        // Notify parent component about cart count update
        if (onUpdateCartCount) {
            onUpdateCartCount(totalItems);
        }
    }, [productQuantities, onUpdateCartCount]);



    const handleAddToCart = useCallback(async (product) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            if (onAddToCart) {
                onAddToCart(product);
            }

            const quantityToAdd = product.quantity || 1;
            const quantityText = quantityToAdd > 1 ? `(${quantityToAdd} items)` : '';

        } catch (error) {
            console.error('Failed to add item to cart:', error);
        } finally {
            setIsLoading(false);
        }
    }, [onAddToCart]);

    const handleUpdateQuantity = useCallback((productId, newQuantity) => {
        setProductQuantities(prev => ({
            ...prev,
            [productId]: newQuantity
        }));
    }, []);



    return (
        <>
            {products.map((product) => (
                <Col key={product.id} xl={3} lg={4} md={6} sm={6} xs={12} className="mb-4">
                    <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        onQuantityChange={handleUpdateQuantity}
                        productQuantities={productQuantities}
                        isLoading={isLoading}
                    />
                </Col>
            ))}
        </>
    );
}

export default ProductList;

ProductList.propTypes = {
    onAddToCart: PropTypes.func.isRequired,
    onUpdateCartCount: PropTypes.func
};