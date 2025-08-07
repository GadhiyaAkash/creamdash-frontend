import { useDispatch } from "react-redux";
import { addCartItem } from "../store/cartSlice";

const useProductUtils = () => {
    const dispatch = useDispatch();

    const updateProductQuantityToCart = (product, updatedQuantity) => {
        const productWithQuantity = {
            ...product,
            quantity: updatedQuantity
        };
        dispatch(addCartItem(productWithQuantity));
    };

    return {
        updateProductQuantityToCart
    };
};

export default useProductUtils;
