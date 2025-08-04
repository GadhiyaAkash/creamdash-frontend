import PropTypes from "prop-types";
import { Button, Container } from "react-bootstrap";
import brandImage from "../../../assets/brand-ice-cream.png";
import { Link } from "react-router-dom";

const HeroSection = ({ user }) => (
    <div className="dashboard">
        <Container>
            <section className="hero">
                <div className="hero-content">
                    <div className="brands">
                        {user && (
                            <div className="user-greeting">
                                <span className="greeting-text">Welcome back, <strong>{user.name}!</strong></span>
                                {user.role === 'admin' && (
                                    <span className="admin-badge">
                                        <i className="fas fa-crown me-1"></i>Admin
                                    </span>
                                )}
                            </div>
                        )}
                        <h1 className="title">CreamDash</h1>
                        <p className="sub-title">
                            {user
                                ? "Ready to explore our delicious ice cream collection? We've got your favorites waiting!"
                                : "Dive into a world of creamy perfection, where every bite tells a story of quality and delight."
                            }
                        </p>
                        <Button as={Link} to="/shop" variant="primary" size="lg" className="cta-button mb-2 mb-sm-0 me-sm-3">
                            <i className="fas fa-shopping-bag me-2"></i>
                            Start Shopping
                        </Button>
                    </div>
                    <div className="brand-image">
                        <img src={brandImage} alt="CreamDash - Premium Ice Cream" />
                    </div>
                </div>
            </section>
        </Container>
    </div>
);

export default HeroSection;

HeroSection.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        role: PropTypes.string
    })
};