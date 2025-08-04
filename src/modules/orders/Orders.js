import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Table, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Orders.scss';

// Mock order data - in a real app, this would come from an API
const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    date: '2025-07-28',
    status: 'delivered',
    total: 45.99,
    items: [
      { id: 1, name: 'Vanilla Bean Ice Cream', price: 12.99, quantity: 2, image: '/src/assets/art1.png' },
      { id: 2, name: 'Chocolate Fudge Ice Cream', price: 14.99, quantity: 1, image: '/src/assets/art2.png' },
      { id: 3, name: 'Strawberry Swirl Ice Cream', price: 13.99, quantity: 1, image: '/src/assets/art1.png' }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2025-07-30'
  },
  {
    id: 'ORD-002',
    date: '2025-07-25',
    status: 'shipped',
    total: 89.97,
    items: [
      { id: 4, name: 'Mint Chocolate Chip Ice Cream', price: 15.99, quantity: 3, image: '/src/assets/art2.png' },
      { id: 5, name: 'Rocky Road Ice Cream', price: 16.99, quantity: 2, image: '/src/assets/art1.png' },
      { id: 6, name: 'Cookies & Cream Ice Cream', price: 14.99, quantity: 1, image: '/src/assets/art2.png' }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2025-07-29'
  },
  {
    id: 'ORD-003',
    date: '2025-07-20',
    status: 'processing',
    total: 32.97,
    items: [
      { id: 7, name: 'Caramel Swirl Ice Cream', price: 13.99, quantity: 1, image: '/src/assets/art1.png' },
      { id: 8, name: 'Pistachio Ice Cream', price: 18.98, quantity: 1, image: '/src/assets/art2.png' }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    trackingNumber: null,
    estimatedDelivery: '2025-07-26'
  },
  {
    id: 'ORD-004',
    date: '2025-07-15',
    status: 'cancelled',
    total: 27.98,
    items: [
      { id: 9, name: 'Lemon Sorbet', price: 13.99, quantity: 2, image: '/src/assets/art1.png' }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    trackingNumber: null,
    estimatedDelivery: null,
    cancellationReason: 'Customer requested cancellation'
  }
];

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Filter orders based on user (in real app, API would handle this)
        if (user) {
          setOrders(MOCK_ORDERS);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { variant: 'success', icon: 'fas fa-check-circle', text: 'Delivered' },
      shipped: { variant: 'info', icon: 'fas fa-shipping-fast', text: 'Shipped' },
      processing: { variant: 'warning', icon: 'fas fa-clock', text: 'Processing' },
      cancelled: { variant: 'danger', icon: 'fas fa-times-circle', text: 'Cancelled' }
    };

    const config = statusConfig[status] || statusConfig.processing;

    return (
      <Badge bg={config.variant} className="status-badge">
        <i className={`${config.icon} me-1`}></i>
        {config.text}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );

  const getOrderSummary = () => {
    const totalOrders = orders.length;
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
    const totalSpent = orders
      .filter(order => order.status !== 'cancelled')
      .reduce((sum, order) => sum + order.total, 0);

    return { totalOrders, deliveredOrders, totalSpent };
  };

  if (!user) {
    return (
      <div className="orders-page">
        <Container className="py-5">
          <div className="text-center">
            <h2>Please log in to view your orders</h2>
            <p className="text-muted">You need to be logged in to access your order history.</p>
            <Button as={Link} to="/" variant="primary">
              Go to Homepage
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const summary = getOrderSummary();

  return (
    <div className="orders-page">
      <Container className="py-5">
        <Row>
          <Col lg={10} className="mx-auto">
            {/* Page Header */}
            <div className="page-header mb-4">
              <h1 className="page-title">
                <i className="fas fa-box me-3"></i>
                My Orders
              </h1>
              <p className="page-subtitle">Track and manage your ice cream orders</p>
            </div>

            {/* Order Summary Cards */}
            <Row className="mb-4">
              <Col md={4}>
                <Card className="summary-card">
                  <Card.Body className="text-center">
                    <i className="fas fa-shopping-bag summary-icon"></i>
                    <h3 className="summary-number">{summary.totalOrders}</h3>
                    <p className="summary-label">Total Orders</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="summary-card">
                  <Card.Body className="text-center">
                    <i className="fas fa-check-circle summary-icon text-success"></i>
                    <h3 className="summary-number">{summary.deliveredOrders}</h3>
                    <p className="summary-label">Delivered</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="summary-card">
                  <Card.Body className="text-center">
                    <i className="fas fa-dollar-sign summary-icon text-warning"></i>
                    <h3 className="summary-number">{formatCurrency(summary.totalSpent)}</h3>
                    <p className="summary-label">Total Spent</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Filter Buttons */}
            <div className="filter-section mb-4">
              <h5 className="filter-title">Filter by Status:</h5>
              <div className="filter-buttons">
                {['all', 'delivered', 'shipped', 'processing', 'cancelled'].map(status => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className="filter-btn"
                  >
                    {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading your orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <Alert variant="info" className="text-center">
                <i className="fas fa-info-circle me-2"></i>
                {filterStatus === 'all' 
                  ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                  : `No ${filterStatus} orders found.`
                }
                {filterStatus === 'all' && (
                  <div className="mt-3">
                    <Button as={Link} to="/shop" variant="primary">
                      <i className="fas fa-shopping-bag me-2"></i>
                      Start Shopping
                    </Button>
                  </div>
                )}
              </Alert>
            ) : (
              <div className="orders-list">
                {filteredOrders.map(order => (
                  <Card key={order.id} className="order-card mb-3">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col md={3}>
                          <div className="order-info">
                            <h6 className="order-id">Order #{order.id}</h6>
                            <p className="order-date">{formatDate(order.date)}</p>
                          </div>
                        </Col>
                        <Col md={2}>
                          {getStatusBadge(order.status)}
                        </Col>
                        <Col md={2}>
                          <div className="order-total">
                            <strong>{formatCurrency(order.total)}</strong>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="order-items">
                            <small className="text-muted">
                              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                            </small>
                            <div className="item-preview">
                              {order.items.slice(0, 3).map((item, index) => (
                                <span key={index} className="item-name">
                                  {item.name}
                                  {index < Math.min(2, order.items.length - 1) && ', '}
                                </span>
                              ))}
                              {order.items.length > 3 && '...'}
                            </div>
                          </div>
                        </Col>
                        <Col md={2} className="text-end">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewOrder(order)}
                          >
                            <i className="fas fa-eye me-1"></i>
                            View Details
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>

        {/* Order Details Modal */}
        <Modal show={showOrderModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-receipt me-2"></i>
              Order Details - #{selectedOrder?.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <div className="order-details">
                {/* Order Status & Info */}
                <Row className="mb-4">
                  <Col md={6}>
                    <div className="detail-section">
                      <h6>Order Information</h6>
                      <p><strong>Order Date:</strong> {formatDate(selectedOrder.date)}</p>
                      <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                      <p><strong>Total:</strong> {formatCurrency(selectedOrder.total)}</p>
                      {selectedOrder.trackingNumber && (
                        <p><strong>Tracking Number:</strong> {selectedOrder.trackingNumber}</p>
                      )}
                      {selectedOrder.estimatedDelivery && (
                        <p><strong>Estimated Delivery:</strong> {formatDate(selectedOrder.estimatedDelivery)}</p>
                      )}
                      {selectedOrder.cancellationReason && (
                        <Alert variant="warning" className="mt-2">
                          <strong>Cancellation Reason:</strong> {selectedOrder.cancellationReason}
                        </Alert>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="detail-section">
                      <h6>Shipping Address</h6>
                      <address>
                        {selectedOrder.shippingAddress.street}<br />
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}<br />
                        {selectedOrder.shippingAddress.country}
                      </address>
                    </div>
                  </Col>
                </Row>

                {/* Order Items */}
                <div className="detail-section">
                  <h6>Order Items</h6>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="item-image me-3">
                                <i className="fas fa-ice-cream"></i>
                              </div>
                              <div>
                                <strong>{item.name}</strong>
                              </div>
                            </div>
                          </td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(item.price)}</td>
                          <td><strong>{formatCurrency(item.price * item.quantity)}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="3" className="text-end">Total:</th>
                        <th>{formatCurrency(selectedOrder.total)}</th>
                      </tr>
                    </tfoot>
                  </Table>
                </div>

                {/* Action Buttons */}
                <div className="modal-actions mt-4">
                  {selectedOrder.status === 'shipped' && selectedOrder.trackingNumber && (
                    <Button variant="info" className="me-2">
                      <i className="fas fa-truck me-2"></i>
                      Track Package
                    </Button>
                  )}
                  {selectedOrder.status === 'delivered' && (
                    <Button variant="outline-primary" className="me-2">
                      <i className="fas fa-redo me-2"></i>
                      Reorder Items
                    </Button>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <Button variant="outline-danger">
                      <i className="fas fa-times me-2"></i>
                      Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

Orders.propTypes = {
  user: PropTypes.object
};

export default Orders;
