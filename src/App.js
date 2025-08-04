import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingList from './modules/shopping/ShoppingList';
import Cart from './modules/cart/Cart';
import Header from './utilities/components/Header';
import Checkout from './modules/checkout/Checkout';
import About from './modules/about/About';
import Contact from './modules/contact/Contact';
import Profile from './modules/profile/Profile';
import Orders from './modules/orders/Orders';
import './App.scss';
import { Dashboard } from './modules/dashboard/Dashboard';
import Footer from './utilities/components/footer/Footer';
import { useSelector } from 'react-redux';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const user = useSelector(state => state.user.user);

  const addToCart = useCallback((item) => {
    const quantity = item.quantity || 1;
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      // Add new item to cart
      setCartItems(prevItems => [...prevItems, { ...item, quantity }]);
    }

    // Update cart count
    setCartCount(prevCount => prevCount + quantity);
  }, [cartItems]);

  const updateCartCount = useCallback((count) => {
    setCartCount(count);
  }, []);

  const removeFromCart = useCallback((itemId) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    if (itemToRemove) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      setCartCount(prevCount => prevCount - itemToRemove.quantity);
    }
  }, [cartItems]);

  const updateCartItemQuantity = useCallback((itemId, newQuantity) => {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      const oldQuantity = updatedCartItems[itemIndex].quantity;
      updatedCartItems[itemIndex].quantity = newQuantity;

      setCartItems(updatedCartItems);
      setCartCount(prevCount => prevCount - oldQuantity + newQuantity);
    }
  }, [cartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartCount(0);
  }, []);

  // Calculate total cart value
  const totalCartValue = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Router>
      <Header
        cartCount={cartCount}
        cartItems={cartItems}
        onClearCart={clearCart}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              onAddToCart={addToCart}
              cartItems={cartItems}
              onUpdateCartCount={updateCartCount}
              user={user}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <ShoppingList
              onAddToCart={addToCart}
              cartItems={cartItems}
              onUpdateCartCount={updateCartCount}
              user={user}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
              onUpdateQuantity={updateCartItemQuantity}
              totalValue={totalCartValue}
              user={user}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              user={user}
              cartItems={cartItems}
              totalValue={totalCartValue}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              user={user}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              user={user}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              user={user}
            // onUpdateUser={setUser}
            />
          }
        />
        <Route
          path="/orders"
          element={
            <Orders
              user={user}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
