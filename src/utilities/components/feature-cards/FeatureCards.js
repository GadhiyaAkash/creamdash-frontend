import { useMemo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import fastDeliveryImage from "../../../assets/delivery.png";
import packageImage from "../../../assets/package.png";
import discountImage from "../../../assets/discount.png";
import PropTypes from "prop-types";
import "./FeatureCards.scss";

const FeatureCards = () => {
    // Static data - in a real app, this would come from an API
    const featureCardsList = useMemo(() => [
        {
            id: 'fast-delivery',
            title: "Fast Delivery",
            text: "Enjoy your favorite ice cream at lightning speed with our fast delivery service!",
            image: fastDeliveryImage,
            cardClass: "success"
        },
        {
            id: 'pure-ingredients',
            title: "100% Pure",
            text: "Indulge in the goodness of 100% pure, natural ingredients sourced responsibly.",
            image: packageImage,
            cardClass: "info"
        },
        {
            id: 'special-offer',
            title: "20% Off",
            text: "Treat yourself to a sweet deal: 20% off your first order! Limited time offer.",
            image: discountImage,
            cardClass: "warning"
        }
    ], []);

    return (
        <Row className="equal-height g-4">
            {
                featureCardsList.map(card => (
                    <Col key={card.id} md={4}>
                        <Card bg={card.cardClass} className="text-center feature-card">
                            <Card.Body>
                                <div className="feature-icon">
                                    <Card.Img src={card.image} className="feature-card-image" alt={card.title} />
                                </div>
                                <Card.Title className="mt-3">{card.title}</Card.Title>
                                <Card.Text>{card.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    );
};

export default FeatureCards;


FeatureCards.propTypes = {
    card: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        cardClass: PropTypes.string.isRequired
    }).isRequired
};