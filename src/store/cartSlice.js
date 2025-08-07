import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems : [
        // { id: 1, title: 'Sample Item', price: 10.00, quantity: 1, image: 'https://via.placeholder.com/50' },
        // { id: 2, title: 'Sample Item 2', price: 15.00, quantity: 2, image: 'https://via.placeholder.com/50' },
        // { id: 3, title: 'Sample Item 3', price: 20.00, quantity: 1, image: 'https://via.placeholder.com/50' },
        // { id: 4, title: 'Sample Item 4', price: 25.00, quantity: 3, image: 'https://via.placeholder.com/50' },
        // { id: 5, title: 'Sample Item 5', price: 30.00, quantity: 1, image: 'https://via.placeholder.com/50' },
        // { id: 6, title: 'Sample Item 6', price: 35.00, quantity: 2, image: 'https://via.placeholder.com/50' }
    ],
    cartCount: 0 // Initialize with the number of items in cartItems
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
        },
        removeCartItem(state, action) {
            const { id } = action.payload;
            state.cartItems = state.cartItems.filter(product => product.id !== id);
            state.cartCount = state.cartItems.length;
        },
        clearCart(state) {
            state.cartItems = [];
            state.cartCount = 0;
        }
    }
});

export const {
    addCartItem,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;