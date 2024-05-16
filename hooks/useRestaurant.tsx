import { MenuItem, RestaurantDetails } from "@/context/RestaurantContext";
import { useEffect, useState } from "react";

export interface useRestaurantReturn {
  menu: MenuItem[];
  addToMenu: (menuItem: MenuItem) => void;
  removeFromMenu: (menuItem: MenuItem) => void;
  editMenu: (key: keyof MenuItem, value: string | number) => void;
  details: RestaurantDetails;
  editDetail: (key: keyof RestaurantDetails, value: string | number) => void;
}

export const useRestaurant = (): useRestaurantReturn => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [details, setDetails] = useState<RestaurantDetails>({
    _id: "",
    categories: [],
    name: "",
    address: "",
    phone: "",
    averageRating: 0,
    averageWaitTime: 0,
    description: "",
  });

  const addToMenu = (menuItem: MenuItem) => {
    console.log('new', menuItem);
    setMenu((prevMenu) => [...prevMenu, menuItem]);
  };

  const removeFromMenu = (menuItem: MenuItem) => {
    setMenu(menu.filter((item) => item.id !== menuItem.id));
  };

  const editDetail = (key: keyof RestaurantDetails, value: string | number) => {
    setDetails({ ...details, [key]: value });
  };

  const editMenu = (key: keyof MenuItem, value: string | number) => {
    setMenu({ ...menu, [key]: value });
  };

  return {
    menu,
    addToMenu,
    removeFromMenu,
    details,
    editDetail,
    editMenu,
  };
};
