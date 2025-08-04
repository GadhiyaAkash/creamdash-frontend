// src/App.js
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
import LoginModal from './utilities/components/auth/LoginModal';
import SignupModal from './utilities/components/auth/SignupModal';
import LogoutConfirmation from './utilities/components/auth/LogoutConfirmation';
import './App.scss';
import { Dashboard } from './modules/dashboard/Dashboard';
import Footer from './utilities/components/footer/Footer';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  // Authentication state
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('creamDashUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('creamDashUser');
      }
    }
  }, []);

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

  // Authentication handlers
  const handleLogin = useCallback((userData) => {
    setUser(userData);
    if (userData.rememberMe) {
      localStorage.setItem('creamDashUser', JSON.stringify(userData));
    }
    setShowLoginModal(false);
  }, []);

  const handleSignup = useCallback((userData) => {
    // In a real app, this would make an API call to create the user
    // For demo purposes, we'll automatically log them in
    const newUser = {
      ...userData,
      rememberMe: true // Auto-remember new users
    };
    
    setUser(newUser);
    localStorage.setItem('creamDashUser', JSON.stringify(newUser));
    setShowSignupModal(false);
    
    // Show a welcome message or redirect to onboarding
    console.log('New user registered:', newUser);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('creamDashUser');
    setShowLogoutModal(false);
    // Optionally clear cart on logout
    // clearCart();
  }, []);

  const handleShowLogin = useCallback(() => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  }, []);

  const handleShowSignup = useCallback(() => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  }, []);

  const handleShowLogout = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const handleCloseLogin = useCallback(() => {
    setShowLoginModal(false);
  }, []);

  const handleCloseSignup = useCallback(() => {
    setShowSignupModal(false);
  }, []);

  const handleCloseLogout = useCallback(() => {
    setShowLogoutModal(false);
  }, []);

  const handleSwitchToSignup = useCallback(() => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  }, []);

  const handleSwitchToLogin = useCallback(() => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  }, []);

  // Calculate total cart value
  const totalCartValue = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Router>
      <Header 
        cartCount={cartCount} 
        cartItems={cartItems}
        onClearCart={clearCart}
        isLoggedIn={!!user}
        userName={user?.name || ''}
        onLogin={handleShowLogin}
        onSignup={handleShowSignup}
        onLogout={handleShowLogout}
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
              onUpdateUser={setUser}
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
      
      {/* Authentication Modals */}
      <LoginModal
        show={showLoginModal}
        onHide={handleCloseLogin}
        onLogin={handleLogin}
        onSwitchToSignup={handleSwitchToSignup}
      />
      
      <SignupModal
        show={showSignupModal}
        onHide={handleCloseSignup}
        onSignup={handleSignup}
        onSwitchToLogin={handleSwitchToLogin}
      />
      
      <LogoutConfirmation
        show={showLogoutModal}
        onHide={handleCloseLogout}
        onConfirm={handleLogout}
        userName={user?.name || 'User'}
      />
    </Router>
  );
};

export default App;
