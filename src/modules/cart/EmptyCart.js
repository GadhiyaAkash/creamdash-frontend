import { Button, Container } from "react-bootstrap";
import noItemImage from '../../assets/no-item.png';
import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="cart-page">
            <Container fluid className="h-100">
                <div className="empty-cart">
                    <div className="empty-cart-content">
                        <div className="empty-cart-image-wrapper">
                            <img
                                src={noItemImage}
                                alt="Empty cart"
                                className="empty-cart-image"
                            />
                        </div>
                        <h2>Your Cart is Empty</h2>
                        <p>Looks like you haven't added any delicious ice cream to your cart yet.</p>
                        <div className="empty-cart-actions">
                            <Button as={Link} to="/shopping" variant="primary" size="lg" className="mb-2 mb-sm-0 me-sm-3">
                                <i className="fas fa-shopping-bag me-2"></i>
                                Start Shopping
                            </Button>
                            <Button as={Link} to="/" variant="outline-primary" size="lg">
                                <i className="fas fa-home me-2"></i>
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default EmptyCart;