import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import About from '../modules/about/About';
import ShoppingList from '../modules/shopping/ShoppingList';
import Contact from '../modules/contact/Contact';
import Cart from '../modules/cart/Cart';
import Checkout from '../modules/checkout/Checkout';
import Profile from '../modules/profile/Profile';
import Orders from '../modules/orders/Orders';
import Dashboard from '../modules/dashboard/Dashboard';
import Footer from './components/footer/Footer';

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/about" element={<About />} />
        <Route path="/shopping" element={<ShoppingList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
