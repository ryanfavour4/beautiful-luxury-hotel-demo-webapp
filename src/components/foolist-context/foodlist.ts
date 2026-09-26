import { createContext } from "react";



export type CartContextType = {
    cartItems: Record<number, number>;
    addToCart: (itemId: number) => void;
    removeFromCart: (itemId: number) => void; // ⚠ FIXED
    updateFoodListItemCount: (itemId: number, newAmount: number) => void;
    getTotalCartAmount: () => number;
};

export const FoodListContext = createContext<CartContextType | null>(null);