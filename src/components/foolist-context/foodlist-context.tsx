import { ReactNode, useState } from "react";
import { FoodListContext } from "./foodlist";
import { foodList } from "@/sections/service-page/food-list-type";

type Props = {
  children: ReactNode;
};

const getDefaultCart = () => {
  const cart: Record<number, number> = {};
  for (let i = 1; i <= foodList.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const FoodListContextProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  // const removeFromCart = (itemId: number) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

  const updateFoodListItemCount = (newAmount: number, itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       const itemInfo = foodList.find((foodlist) => foodlist.id === Number(item));
  //       if (!itemInfo) return null;
  //       totalAmount += cartItems[item] * itemInfo?.price;
  //     }
  //   }
  //   return totalAmount;
  // };

  const getTotalCartAmount = (): number => {
    let totalAmount = 0;

    for (const item in cartItems) {
      const quantity = cartItems[item];

      if (quantity > 0) {
        const itemInfo = foodList.find((food) => food.id === Number(item));

        if (!itemInfo) continue;

        totalAmount += quantity * itemInfo.price;
      }
    }

    return totalAmount;
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateFoodListItemCount,
    getTotalCartAmount,
  };

  return <FoodListContext.Provider value={contextValue}>{children}</FoodListContext.Provider>;
};
