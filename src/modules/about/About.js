import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './About.scss';

// Asset imports
import aboutHeroImage from '../../assets/brand-ice-cream.png';
import aboutUsRightTopImage from '../../assets/art1.png';
import aboutUsLeftBottomImage from '../../assets/art2.png';
import vanillaImage from '../../assets/service1.jpg';
import chocolateImage from '../../assets/service2.jpg';
import strawberryImage from '../../assets/service3.jpg';
import packageImage from '../../assets/package.png';
import deliveryImage from '../../assets/delivery.png';
import discountImage from '../../assets/discount.png';

// Team member component
const TeamMember = ({ member }) => (
  <Col lg={4} md={6} className="mb-4">
    <Card className="team-card h-100">
      <div className="team-image-wrapper">
        <Card.Img variant="top" src={member.image} alt={member.name} />
      </div>
      <Card.Body className="text-center">
        <Card.Title className="team-name">{member.name}</Card.Title>
        <Card.Subtitle className="team-role mb-2">{member.role}</Card.Subtitle>
        <Card.Text className="team-bio">{member.bio}</Card.Text>
        <div className="team-social">
          {member.social.map((link, index) => (
            <Button
              key={index}
              variant="link"
              size="sm"
              className="social-btn"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={link.icon}></i>
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  </Col>
);

TeamMember.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    social: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
};

// Values card component
const ValueCard = ({ value }) => (
  <Col lg={4} md={6} className="mb-4">
    <Card className="value-card h-100">
      <Card.Body className="text-center">
        <div className="value-icon">
          <img src={value.icon} alt={value.title} />
        </div>
        <Card.Title className="value-title">{value.title}</Card.Title>
        <Card.Text className="value-description">{value.description}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

ValueCard.propTypes = {
  value: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired
};

// Story timeline component
const StoryTimeline = ({ stories }) => (
  <div className="story-timeline">
    {stories.map((story, index) => (
      <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
        <div className="timeline-content">
          <div className="timeline-year">{story.year}</div>
          <h4 className="timeline-title">{story.title}</h4>
          <p className="timeline-description">{story.description}</p>
        </div>
      </div>
    ))}
  </div>
);

StoryTimeline.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({
    year: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired
};

const About = ({ user = null }) => {
  // Mock data - in a real app, this would come from an API
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Passionate about creating the perfect ice cream experience with over 15 years in the industry.',
      image: vanillaImage,
      social: [
        { icon: 'fab fa-linkedin', url: '#' },
        { icon: 'fab fa-twitter', url: '#' },
        { icon: 'fab fa-instagram', url: '#' }
      ]
    },
    {
      name: 'Michael Chen',
      role: 'Head Chef',
      bio: 'Master artisan specializing in unique flavor combinations and traditional ice cream making techniques.',
      image: chocolateImage,
      social: [
        { icon: 'fab fa-instagram', url: '#' },
        { icon: 'fab fa-facebook', url: '#' }
      ]
    },
    {
      name: 'Emily Rodriguez',
      role: 'Quality Manager',
      bio: 'Ensures every batch meets our high standards for taste, texture, and quality ingredients.',
      image: strawberryImage,
      social: [
        { icon: 'fab fa-linkedin', url: '#' },
        { icon: 'fab fa-instagram', url: '#' }
      ]
    }
  ];

  const companyValues = [
    {
      title: 'Quality First',
      description: 'We source only the finest ingredients and maintain the highest standards in every batch.',
      icon: packageImage
    },
    {
      title: 'Fast Delivery',
      description: 'Get your favorite ice cream delivered fresh and cold right to your doorstep.',
      icon: deliveryImage
    },
    {
      title: 'Great Value',
      description: 'Premium quality at affordable prices with regular deals and special offers.',
      icon: discountImage
    }
  ];

  const companyStory = [
    {
      year: '2019',
      title: 'The Beginning',
      description: 'Started as a small family business with a passion for creating exceptional ice cream using traditional methods.'
    },
    {
      year: '2020',
      title: 'Going Digital',
      description: 'Launched our online platform to bring our delicious ice cream directly to customers\' homes.'
    },
    {
      year: '2022',
      title: 'Expansion',
      description: 'Opened our second location and expanded our delivery network to serve more communities.'
    },
    {
      year: '2024',
      title: 'Innovation',
      description: 'Introduced new flavors and eco-friendly packaging, setting new standards in the industry.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-images">
          <img
            src={aboutUsRightTopImage}
            alt="Decorative ice cream illustration"
            className="about-hero-right-top"
            loading="lazy"
          />
          <img
            src={aboutUsLeftBottomImage}
            alt="Decorative ice cream illustration"
            className="about-hero-left-bottom"
            loading="lazy"
          />
        </div>
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="hero-content">
              {user && (
                <div className="user-greeting">
                  <span className="greeting-text">
                    Welcome to our story, <strong>{user.name}!</strong>
                  </span>
                </div>
              )}
              <h1 className="hero-title">About CreamDash</h1>
              <p className="hero-subtitle">
                Crafting moments of joy, one scoop at a time. Discover the passion, 
                quality, and dedication behind every delicious creation.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Unique Flavors</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Years of Excellence</span>
                </div>
              </div>
            </Col>
            <Col lg={6} className="hero-image">
              <img src={aboutHeroImage} alt="CreamDash - Premium Ice Cream" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <Container>
          <Row>
            <Col lg={6} className="mb-4">
              <Card className="mission-card">
                <Card.Body>
                  <div className="section-icon">
                    <i className="fas fa-bullseye"></i>
                  </div>
                  <Card.Title>Our Mission</Card.Title>
                  <Card.Text>
                    To create exceptional ice cream experiences that bring joy to every customer 
                    while maintaining the highest standards of quality, sustainability, and innovation. 
                    We believe that great ice cream is more than just a treat—it's a moment of happiness 
                    that connects people and creates lasting memories.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} className="mb-4">
              <Card className="vision-card">
                <Card.Body>
                  <div className="section-icon">
                    <i className="fas fa-eye"></i>
                  </div>
                  <Card.Title>Our Vision</Card.Title>
                  <Card.Text>
                    To become the most beloved ice cream brand globally, known for our commitment 
                    to quality, innovation, and customer satisfaction. We envision a world where 
                    every scoop of CreamDash ice cream creates a moment of pure delight and brings 
                    communities together through the universal language of great taste.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Company Values */}
      <section className="company-values">
        <Container>
          <div className="section-header text-center mb-5">
            <h2>Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do at CreamDash
            </p>
          </div>
          <Row>
            {companyValues.map((value, index) => (
              <ValueCard key={index} value={value} />
            ))}
          </Row>
        </Container>
      </section>

      {/* Our Story Timeline */}
      <section className="our-story">
        <Container>
          <div className="section-header text-center mb-5">
            <h2>Our Journey</h2>
            <p className="section-subtitle">
              From humble beginnings to becoming your favorite ice cream destination
            </p>
          </div>
          <StoryTimeline stories={companyStory} />
        </Container>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <Container>
          <div className="section-header text-center mb-5">
            <h2>Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate people behind your favorite ice cream
            </p>
          </div>
          <Row>
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2>Ready to Taste the Difference?</h2>
              <p className="cta-subtitle">
                Join thousands of satisfied customers who have made CreamDash their go-to choice for premium ice cream.
              </p>
              <div className="cta-buttons">
                <Button variant="primary" size="lg" href="/shop" className="me-3">
                  <i className="fas fa-shopping-bag me-2"></i>
                  Shop Now
                </Button>
                <Button variant="outline-primary" size="lg" href="/contact">
                  <i className="fas fa-envelope me-2"></i>
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

About.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string
  })
};

About.defaultProps = {
  user: null
};

export default About;
