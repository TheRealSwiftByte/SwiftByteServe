import { useRestaurant, useRestaurantReturn } from "@/hooks/useRestaurant";
import React, { createContext, useState, useContext, useEffect } from "react";

export interface FoodCategory {
  id: number;
  name: string;
  imageUrl: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface RestaurantDetails {
  _id: string;
  categories: FoodCategory[];
  name: string;
  address: string;
  phone: string;
  averageRating: number;
  averageWaitTime: number;
  description: string;
}

export const RestaurantContext = createContext<useRestaurantReturn>({
  menu: [],
  addToMenu: () => {},
  removeFromMenu: () => {},
  details: {
    _id: "",
    categories: [],
    name: "",
    address: "",
    phone: "",
    averageRating: 0,
    averageWaitTime: 0,
    description: "",
  },
  editDetail: () => {},
  editMenu: () => {},
});

export function RestaurantContextProvider({ children }: any) {
  const value = useRestaurant();

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}
