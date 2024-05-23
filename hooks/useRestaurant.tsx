import { MenuItem, MenuItemType } from "@/api/schema/MenuItem";
import { FoodCategory, Restaurant } from "@/api/schema/Restaurant";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export interface useRestaurantReturn {
  auth: {
    isLoggedIn: boolean;
    email: string;
    password: string;
  };
  menu: MenuItem[];
  addToMenu: (menuItem: MenuItem) => void;
  removeFromMenu: (menuItem: MenuItem) => void;
  editMenu: (id: string, editedItem: MenuItem) => void;
  details: Restaurant;
  editDetail: (value: Restaurant) => void;
  updateAuth: (isLoggedIn: boolean, email: string, password: string) => void;
  setAllMenu: (menu: MenuItem[]) => void;
}

export const useRestaurant = (): useRestaurantReturn => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [auth, setAuth] = useState<{
    isLoggedIn: boolean;
    email: string;
    password: string;
  }>({
    isLoggedIn: false,
    email: "",
    password: "",
  });
  const [details, setDetails] = useState<Restaurant>({
    id: v4(),
    categories: [FoodCategory.JAPANESE, FoodCategory.ASIAN],
    email: "info@sushiworld.com",
    imageURI: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    password: "securepassword123",
    name: "Sushi World",
    address: "123 Sushi Lane, Tokyo, Japan",
    phone: "+81-3-1234-5678",
    averageRating: 4.7,
    averageWaitTime: 15,
    description:
      "Sushi World offers the finest sushi made from the freshest ingredients. Enjoy a wide range of traditional and contemporary Japanese dishes in a modern setting.",
    menu: [],
  });

  const addToMenu = (menuItem: MenuItem) => {
    setMenu((prevMenu) => [...prevMenu, menuItem]);
  };

  const updateAuth = (isLoggedIn: boolean, email: string, password: string) => {
    setAuth({
      isLoggedIn,
      email,
      password,
    });
  };

  const removeFromMenu = (menuItem: MenuItem) => {
    setMenu(menu.filter((item) => item.name !== menuItem.name));
  };

  const editDetail = (value: Restaurant) => {
    setDetails((prevValue) => value);
  };

  const editMenu = (id: string, editedItem: MenuItem) => {
    const newMenu: MenuItem[] = menu.map((i) => {
      if (i.name == id) {
        return editedItem;
      }
      return i;
    });
    console.log(newMenu);
    setMenu((prevMenu) => [...newMenu]);
  };

  const setAllMenu = (menu: MenuItem[]) => {
    setMenu(menu);
  };

  return {
    auth,
    menu,
    addToMenu,
    removeFromMenu,
    details,
    editDetail,
    editMenu,
    updateAuth,
    setAllMenu,
  };
};

// [
//   {
//     id: v4(),
//     category: MenuItemType.MAIN,
//     name: "Sashimi Platter",
//     price: 25.99,
//     description:
//       "A selection of fresh sashimi including tuna, salmon, and yellowtail.",
//     imagePath: "https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     isAvailable: true,
//   },
//   {
//     id: v4(),
//     category: MenuItemType.DRINK,
//     name: "Green Tea",
//     price: 2.5,
//     description: "A refreshing cup of traditional Japanese green tea.",
//     imagePath: "https://images.pexels.com/photos/3090274/pexels-photo-3090274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     isAvailable: true,
//   },
//   {
//     id: v4(),
//     category: MenuItemType.STARTER,
//     name: "Edamame",
//     price: 4.0,
//     description: "Boiled and salted edamame beans.",
//     imagePath: "https://images.pexels.com/photos/1860193/pexels-photo-1860193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     isAvailable: true,
//   },
//   {
//     id: v4(),
//     category: MenuItemType.DESSERT,
//     name: "Mochi Ice Cream",
//     price: 5.5,
//     description:
//       "Delicious mochi filled with creamy ice cream, available in various flavors.",
//     imagePath: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     isAvailable: true,
//   },
//   {
//     id: v4(),
//     category: MenuItemType.POPULAR,
//     name: "California Roll",
//     price: 8.99,
//     description:
//       "A popular sushi roll with crab meat, avocado, and cucumber.",
//     imagePath: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     isAvailable: true,
//   },
// ]