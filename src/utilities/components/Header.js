import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar, Nav, Container, Badge, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import cartIcon from '../../assets/cart.png';
import './Header.scss';

const Header = ({ 
  cartCount = 0, 
  cartItems = [], 
  onClearCart, 
  isLoggedIn = false, 
  userName = '',
  onLogin,
  onSignup,
  onLogout 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  const handleMobileMenuToggle = useCallback(() => {
    setShowMobileMenu(prev => !prev);
  }, []);

  const handleCartClick = useCallback(() => {
    setShowMobileMenu(false);
  }, []);

  const handleLoginClick = useCallback(() => {
    if (onLogin) {
      onLogin();
    }
    setShowMobileMenu(false);
  }, [onLogin]);

  const handleSignupClick = useCallback(() => {
    if (onSignup) {
      onSignup();
    }
    setShowMobileMenu(false);
  }, [onSignup]);

  const handleLogoutClick = useCallback(() => {
    if (onLogout) {
      onLogout();
    }
    setShowMobileMenu(false);
  }, [onLogout]);

  // Calculate total cart value
  const totalCartValue = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  // Navigation items
  const navigationItems = useMemo(() => [
    { path: '/', label: 'Home', exact: true },
    { path: '/shop', label: 'Shop', exact: false },
    { path: '/about', label: 'About', exact: false },
    { path: '/contact', label: 'Contact', exact: false }
  ], []);

  const isActiveRoute = useCallback((path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <Navbar expand="lg" className="custom-navbar" expanded={showMobileMenu}>
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/" className="brand-logo">
            <span className="brand-text">CreamDash</span>
          </Navbar.Brand>

          {/* Mobile Menu Toggle */}
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={handleMobileMenuToggle}
            className="custom-toggler"
          >
            <span className="navbar-toggler-icon">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </span>
          </Navbar.Toggle>

          {/* Navigation Menu */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {navigationItems.map((item) => (
                <Nav.Link
                  key={item.path}
                  as={Link}
                  to={item.path}
                  className={`nav-item ${isActiveRoute(item.path, item.exact) ? 'active' : ''}`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>

            {/* Right Side Actions */}
            <Nav className="ms-auto align-items-center">
              {/* User Authentication */}
              {isLoggedIn ? (
                <Dropdown align="end" className="user-dropdown me-2">
                  <Dropdown.Toggle variant="link" className="user-toggle">
                    <span className="user-greeting">Hello, {userName}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders">
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogoutClick}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div className="auth-buttons">
                  <Button 
                    variant="outline-light" 
                    size="sm" 
                    className="login-btn me-2"
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="light" 
                    size="sm" 
                    className="signup-btn me-3"
                    onClick={handleSignupClick}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Shopping Cart */}
              <Nav.Link 
                as={Link} 
                to="/cart" 
                className="cart-link"
                onClick={handleCartClick}
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <div className="cart-container">
                  <img src={cartIcon} alt="Shopping Cart" className="cart-icon" />
                  {cartCount > 0 && (
                    <Badge bg="danger" className="cart-badge">
                      {cartCount > 99 ? '99+' : cartCount}
                    </Badge>
                  )}
                </div>
                <div className="cart-info d-none d-lg-block">
                  <div className="cart-text">Cart</div>
                  {totalCartValue > 0 && (
                    <div className="cart-total">${totalCartValue.toFixed(2)}</div>
                  )}
                </div>
              </Nav.Link>

              {/* Cart Dropdown for Desktop */}
              {cartCount > 0 && (
                <Dropdown align="end" className="cart-dropdown d-none d-lg-block">
                  <Dropdown.Toggle variant="link" className="cart-dropdown-toggle">
                    <i className="fas fa-chevron-down"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="cart-dropdown-menu">
                    <div className="cart-preview">
                      <h6 className="cart-preview-title">Cart Items ({cartCount})</h6>
                      <div className="cart-items-preview">
                        {cartItems.slice(0, 3).map((item) => (
                          <div key={item.id || item.title} className="cart-item-preview">
                            <img src={item.image} alt={item.title} className="item-image" />
                            <div className="item-details">
                              <div className="item-name">{item.title}</div>
                              <div className="item-price">
                                {item.quantity} × ${item.price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        ))}
                        {cartCount > 3 && (
                          <div className="more-items">
                            +{cartCount - 3} more items
                          </div>
                        )}
                      </div>
                      <div className="cart-actions">
                        <div className="total-amount">
                          Total: ${totalCartValue.toFixed(2)}
                        </div>
                        <div className="action-buttons">
                          <Button 
                            as={Link} 
                            to="/cart" 
                            variant="outline-primary" 
                            size="sm"
                            className="me-2"
                          >
                            View Cart
                          </Button>
                          <Button 
                            as={Link} 
                            to="/checkout" 
                            variant="primary" 
                            size="sm"
                          >
                            Checkout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

Header.propTypes = {
  cartCount: PropTypes.number,
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    image: PropTypes.string
  })),
  onClearCart: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  userName: PropTypes.string,
  onLogin: PropTypes.func,
  onSignup: PropTypes.func,
  onLogout: PropTypes.func
};

Header.defaultProps = {
  cartCount: 0,
  cartItems: [],
  isLoggedIn: false,
  userName: '',
  onClearCart: () => {},
  onLogin: () => {},
  onSignup: () => {},
  onLogout: () => {}
};

export default Header;
