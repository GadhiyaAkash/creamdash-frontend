import { useCallback, useState } from 'react';
import { Col } from 'react-bootstrap';
import ProductCard from '../product-card/ProductCard';
import { PRODUCT_LIST } from './ProductListConst';

const ProductList = () => {
    const [products, setProducts] = useState(PRODUCT_LIST.map(p => ({ ...p, quantity: 0 })));

    const handleUpdateQuantity = useCallback((productId, newQuantity) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId ? { ...p, quantity: newQuantity } : p
            )
        );
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