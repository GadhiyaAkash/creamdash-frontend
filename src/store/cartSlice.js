import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems : JSON.parse(localStorage.getItem('cartItems')) || [],
    cartCount: localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem(state, action) {
            const { id, quantity } = action.payload;
            const existingProduct = state.cartItems.find(product => product.id === id);
            if (existingProduct) {
                existingProduct.quantity = quantity;
            } else {
                state.cartItems.push(action.payload);
            }
            // Remove item if quantity is 0
            if (quantity === 0) {
                state.cartItems = state.cartItems.filter(product => product.id !== id);
            }
            state.cartCount = state.cartItems.length;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('cartCount', state.cartCount);
        },
        clearCart(state) {
            state.cartItems = [];
            state.cartCount = 0;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('cartCount', state.cartCount);
        }
    }
});

export const {
    addCartItem,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;