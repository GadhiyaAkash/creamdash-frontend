import { useCallback, useState } from 'react';
import { Col } from 'react-bootstrap';
import ProductCard from '../product-card/ProductCard';
import { PRODUCT_LIST } from './ProductListConst';
import useProductUtils from '../../../hooks/useProductUtils';

const ProductList = () => {
    const [products, setProducts] = useState(PRODUCT_LIST.slice(0, 4).map(p => ({ ...p, quantity: 0 })));
    const { updateProductQuantityToCart } = useProductUtils();

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
        <>
            {products.map((product) => (
                <Col key={product.id} xl={3} lg={4} md={6} sm={6} xs={12} className="mb-4">
                    <ProductCard
                        product={product}
                        onQuantityChange={handleUpdateQuantity}
                    />
                </Col>
            ))}
        </>
    );
}

export default ProductList;