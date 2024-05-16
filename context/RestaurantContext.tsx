import { useRestaurant, useRestaurantReturn } from "@/hooks/useRestaurant";
import React, { createContext, useState, useContext } from "react";

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
  menu: [
    {
      id: "1",
      name: "Pad Thai",
      description:
        "A stir-fried rice noodle dish commonly served as a street food and at most restaurants in Thailand.",
      price: 9.99,
      imageUrl: "https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "2",
      name: "Sushi",
      description:
        "A Japanese dish of prepared vinegared rice, usually with some sugar and salt, accompanying a variety of ingredients.",
      price: 12.5,
      imageUrl: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "3",
      name: "Kimchi",
      description:
        "A staple in Korean cuisine, made from salted and fermented vegetables, most commonly napa cabbage and Korean radishes.",
      price: 7.99,
      imageUrl: "https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "4",
      name: "Pho",
      description:
        "A Vietnamese soup consisting of broth, rice noodles, herbs, and meat, often served with bean sprouts and lime wedges.",
      price: 10.99,
      imageUrl: "https://images.pexels.com/photos/2089712/pexels-photo-2089712.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "5",
      name: "Dim Sum",
      description:
        "A style of Chinese cuisine prepared as small bite-sized portions of food served in small steamer baskets or on small plates.",
      price: 15.99,
      imageUrl: "https://images.pexels.com/photos/2689419/pexels-photo-2689419.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "6",
      name: "Shezuan Chicken",
      description:
        "A style of Chinese cuisine prepared as small bite-sized portions of food served in small steamer baskets or on small plates.",
      price: 17.99,
      imageUrl: "https://images.pexels.com/photos/3297882/pexels-photo-3297882.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ],
  addToMenu: (menuItem: MenuItem) => {console.log('add')},
  removeFromMenu: () => {},
  details: {
    _id: "001",
    categories: [
      {
        id: 1,
        name: "Asian",
        imageUrl: "",
      },
    ],
    name: "Kinn Thai",
    address: "3 Crown St, Wollongong",
    phone: "045678909",
    averageRating: 4.5,
    averageWaitTime: 48,
    description: "Famous thai restaurant in Wollongong.",
  },
  editDetail: () => {},
  editMenu: () => {},
});


export function RestaurantContextProvider({ children }: any) {
  const value = useRestaurant();

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
}