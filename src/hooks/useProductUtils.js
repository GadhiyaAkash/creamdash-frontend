import { useDispatch } from "react-redux";
import { addCartItem } from "../store/cartSlice";

const useProductUtils = () => {
    const dispatch = useDispatch();
    const storedItems = localStorage.getItem('cartItems');
    const cartItems = JSON.parse(storedItems) || [];

    const updateProductQuantityToCart = (product, updatedQuantity) => {
        const productWithQuantity = {
            ...product,
            quantity: updatedQuantity
        };
        dispatch(addCartItem(productWithQuantity));
    };

    return {
        updateProductQuantityToCart,
        cartItems
    };
};

export default useProductUtils;
