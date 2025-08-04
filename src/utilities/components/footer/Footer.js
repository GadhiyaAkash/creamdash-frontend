import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Footer.scss';

const Footer = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: 'fab fa-facebook-f', 
      url: 'https://facebook.com/creamdash',
      color: '#4267B2'
    },
    { 
      name: 'Instagram', 
      icon: 'fab fa-instagram', 
      url: 'https://instagram.com/creamdash',
      color: '#E1306C'
    },
    { 
      name: 'Twitter', 
      icon: 'fab fa-twitter', 
      url: 'https://twitter.com/creamdash',
      color: '#1DA1F2'
    },
    { 
      name: 'YouTube', 
      icon: 'fab fa-youtube', 
      url: 'https://youtube.com/creamdash',
      color: '#FF0000'
    }
  ];

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#faq' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Refund Policy', href: '#refund' },
    { name: 'Shipping Info', href: '#shipping' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', email);
      e.target.reset();
      // You could show a success message here
    }
  };

  return (
    <footer className={`app-footer ${className}`}>
      <div className="footer-content">
        <Container>
          <Row className="g-4">
            {/* Brand Section */}
            <Col lg={4} md={6} xs={12}>
              <div className="footer-section brand-section">
                <h3 className="footer-brand">CreamDash</h3>
                <p className="footer-description">
                  Premium ice cream delivered to your doorstep. Made with the finest ingredients 
                  and crafted with love for ice cream enthusiasts everywhere.
                </p>
                <div className="social-links">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ '--social-color': link.color }}
                      aria-label={`Follow us on ${link.name}`}
                    >
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={3} sm={6} xs={12}>
              <div className="footer-section">
                <h4 className="footer-title">Quick Links</h4>
                <ul className="footer-links">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="footer-link">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            {/* Legal Links */}
            <Col lg={2} md={3} sm={6} xs={12}>
              <div className="footer-section">
                <h4 className="footer-title">Legal</h4>
                <ul className="footer-links">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="footer-link">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            {/* Newsletter Section */}
            <Col lg={4} md={12} xs={12}>
              <div className="footer-section newsletter-section">
                <h4 className="footer-title">Stay Sweet</h4>
                <p className="newsletter-description">
                  Subscribe to get special offers, exclusive flavors, and ice cream news!
                </p>
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control newsletter-input"
                      placeholder="Enter your email"
                      required
                      aria-label="Email address for newsletter"
                    />
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="newsletter-btn"
                    >
                      <i className="fas fa-envelope me-2"></i>
                      Subscribe
                    </Button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6} xs={12} className="text-center text-md-start">
              <p className="copyright">
                © {currentYear} CreamDash. All rights reserved.
              </p>
            </Col>
            <Col md={6} xs={12} className="text-center text-md-end">
              <p className="made-with-love">
                Made with <i className="fas fa-heart text-danger"></i> for ice cream lovers
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
