import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Contact.scss';

// Contact info component
const ContactInfo = ({ info }) => (
  <Card className="contact-info-card h-100">
    <Card.Body className="text-center">
      <div className="contact-icon">
        <i className={info.icon}></i>
      </div>
      <Card.Title className="contact-title">{info.title}</Card.Title>
      <Card.Text className="contact-details">
        {info.details.map((detail, index) => (
          <div key={index} className="detail-item">
            {info.links && info.links[index] ? (
              <a href={info.links[index]} className="contact-link">
                {detail}
              </a>
            ) : (
              detail
            )}
          </div>
        ))}
      </Card.Text>
    </Card.Body>
  </Card>
);

ContactInfo.propTypes = {
  info: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(PropTypes.string).isRequired,
    links: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

// FAQ item component
const FAQItem = ({ faq, isActive, onToggle }) => (
  <Card className={`faq-item ${isActive ? 'active' : ''}`}>
    <Card.Header 
      className="faq-header"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onToggle()}
    >
      <h5 className="faq-question mb-0">
        {faq.question}
        <i className={`fas fa-chevron-${isActive ? 'up' : 'down'} faq-icon`}></i>
      </h5>
    </Card.Header>
    {isActive && (
      <Card.Body className="faq-body">
        <p className="faq-answer">{faq.answer}</p>
      </Card.Body>
    )}
  </Card>
);

FAQItem.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

const Contact = ({ user = null }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Contact information
  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visit Our Store',
      details: [
        '123 Ice Cream Street',
        'Sweet Valley, CA 90210',
        'United States'
      ]
    },
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      details: [
        '+1 (555) 123-4567',
        '+1 (555) 987-6543'
      ],
      links: [
        'tel:+15551234567',
        'tel:+15559876543'
      ]
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      details: [
        'hello@creamdash.com',
        'support@creamdash.com'
      ],
      links: [
        'mailto:hello@creamdash.com',
        'mailto:support@creamdash.com'
      ]
    },
    {
      icon: 'fas fa-clock',
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 8:00 PM',
        'Saturday: 10:00 AM - 9:00 PM',
        'Sunday: 11:00 AM - 7:00 PM'
      ]
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'You can place an order through our website by browsing our menu, adding items to your cart, and proceeding to checkout. You can also call us directly during business hours.'
    },
    {
      question: 'What are your delivery areas?',
      answer: 'We currently deliver within a 15-mile radius of our store location. You can check if we deliver to your area by entering your zip code during checkout.'
    },
    {
      question: 'Do you offer sugar-free or vegan options?',
      answer: 'Yes! We offer a variety of sugar-free flavors made with natural sweeteners and several vegan options made with coconut or oat milk. Check our menu for the complete list.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 30-45 minutes during regular hours. During peak times (weekends and holidays), delivery may take up to 60 minutes.'
    },
    {
      question: 'Can I customize my ice cream order?',
      answer: 'Absolutely! You can add toppings, mix flavors, and create custom combinations. We also offer build-your-own sundaes and specialty desserts.'
    },
    {
      question: 'What is your return policy?',
      answer: 'If you\'re not satisfied with your order, please contact us within 24 hours. We offer refunds or replacements for quality issues.'
    }
  ];

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear notification when user starts typing
    if (notification) setNotification(null);
  }, [notification]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    // Basic form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setNotification({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success
      setNotification({
        type: 'success',
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
      });

      // Reset form
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        subject: '',
        message: '',
        category: 'general'
      });

    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    }

    setIsSubmitting(false);
  }, [formData, user]);

  const handleFAQToggle = useCallback((index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  }, [activeFAQ]);

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              {user && (
                <div className="user-greeting">
                  <span className="greeting-text">
                    Hi <strong>{user.name}</strong>, we'd love to hear from you!
                  </span>
                </div>
              )}
              <h1 className="hero-title">Get in Touch</h1>
              <p className="hero-subtitle">
                Have a question, suggestion, or just want to say hello? 
                We're here to help and would love to connect with you.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <Container>
          <div className="section-header text-center mb-5">
            <h2>Contact Information</h2>
            <p className="section-subtitle">
              Multiple ways to reach us - choose what works best for you
            </p>
          </div>
          <Row>
            {contactInfo.map((info, index) => (
              <Col key={index} lg={3} md={6} className="mb-4">
                <ContactInfo info={info} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="contact-form-wrapper">
                <div className="section-header text-center mb-4">
                  <h2>Send Us a Message</h2>
                  <p className="section-subtitle">
                    Fill out the form below and we'll get back to you as soon as possible
                  </p>
                </div>

                {notification && (
                  <Alert 
                    variant={notification.type === 'error' ? 'danger' : 'success'}
                    className="mb-4"
                    dismissible
                    onClose={() => setNotification(null)}
                  >
                    <i className={`fas fa-${notification.type === 'error' ? 'exclamation-triangle' : 'check-circle'} me-2`}></i>
                    {notification.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Full Name <span className="required">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          disabled={isSubmitting}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Email Address <span className="required">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          required
                          disabled={isSubmitting}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="order">Order Support</option>
                          <option value="delivery">Delivery Issues</option>
                          <option value="feedback">Feedback</option>
                          <option value="business">Business Partnership</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Enter subject (optional)"
                          disabled={isSubmitting}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      Message <span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      required
                      disabled={isSubmitting}
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <Container>
          <div className="section-header text-center mb-5">
            <h2>Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Quick answers to common questions about our ice cream and services
            </p>
          </div>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    faq={faq}
                    isActive={activeFAQ === index}
                    onToggle={() => handleFAQToggle(index)}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <Container>
          <div className="section-header text-center mb-5">
            <h2>Find Our Store</h2>
            <p className="section-subtitle">
              Visit us in person for the full CreamDash experience
            </p>
          </div>
          <Row>
            <Col lg={10} className="mx-auto">
              <div className="map-wrapper">
                <div className="map-placeholder">
                  <div className="map-content">
                    <i className="fas fa-map-marked-alt map-icon"></i>
                    <h4>Interactive Map</h4>
                    <p>123 Ice Cream Street, Sweet Valley, CA 90210</p>
                    <Button variant="outline-primary" href="https://maps.google.com" target="_blank">
                      <i className="fas fa-external-link-alt me-2"></i>
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Social Media Section */}
      <section className="social-section">
        <Container>
          <Row className="text-center">
            <Col lg={6} className="mx-auto">
              <h2>Follow Us</h2>
              <p className="social-subtitle">
                Stay connected for the latest flavors, offers, and ice cream adventures!
              </p>
              <div className="social-links">
                <a href="https://facebook.com/creamdash" className="social-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                  <span>Facebook</span>
                </a>
                <a href="https://instagram.com/creamdash" className="social-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a href="https://twitter.com/creamdash" className="social-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                  <span>Twitter</span>
                </a>
                <a href="https://youtube.com/creamdash" className="social-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                  <span>YouTube</span>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

Contact.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  })
};

Contact.defaultProps = {
  user: null
};

export default Contact;
