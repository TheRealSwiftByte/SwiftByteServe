

// import { useEffect, useState } from "react";

// export interface useOrderReturn {
//   menu: MenuItem[];
//   addToMenu: (menuItem: MenuItem) => void;
//   removeFromMenu: (menuItem: MenuItem) => void;
//   editMenu: (id: string, editedItem: MenuItem) => void;
//   details: RestaurantDetails;
//   editDetail: (key: keyof RestaurantDetails, value: string | number) => void;
// }

// export const useRestaurant = (): useRestaurantReturn => {
//   const [menu, setMenu] = useState<MenuItem[]>([
//     {
//       id: "1",
//       name: "Pad Thai",
//       description:
//         "A stir-fried rice noodle dish commonly served as a street food and at most restaurants in Thailand.",
//       price: 9.99,
//       imageUrl:
//         "https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg?auto=compress&cs=tinysrgb&w=800",
//     },
//     {
//       id: "2",
//       name: "Sushi",
//       description:
//         "A Japanese dish of prepared vinegared rice, usually with some sugar and salt, accompanying a variety of ingredients.",
//       price: 12.5,
//       imageUrl:
//         "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800",
//     },
//     {
//       id: "3",
//       name: "Kimchi",
//       description:
//         "A staple in Korean cuisine, made from salted and fermented vegetables, most commonly napa cabbage and Korean radishes.",
//       price: 7.99,
//       imageUrl:
//         "https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=800",
//     },
//     {
//       id: "4",
//       name: "Pho",
//       description:
//         "A Vietnamese soup consisting of broth, rice noodles, herbs, and meat, often served with bean sprouts and lime wedges.",
//       price: 10.99,
//       imageUrl:
//         "https://images.pexels.com/photos/2089712/pexels-photo-2089712.jpeg?auto=compress&cs=tinysrgb&w=800",
//     },
//     {
//       id: "5",
//       name: "Dim Sum",
//       description:
//         "A style of Chinese cuisine prepared as small bite-sized portions of food served in small steamer baskets or on small plates.",
//       price: 15.99,
//       imageUrl:
//         "https://images.pexels.com/photos/2689419/pexels-photo-2689419.jpeg?auto=compress&cs=tinysrgb&w=800",
//     },
//     {
//       id: "6",
//       name: "Shezuan Chicken",
//       description:
//         "A style of Chinese cuisine prepared as small bite-sized portions of food served in small steamer baskets or on small plates.",
//       price: 17.99,
//       imageUrl:
//         "https://images.pexels.com/photos/3297882/pexels-photo-3297882.jpeg?auto=compress&cs=tinysrgb&w=800",
//     },
//   ]);
//   const [details, setDetails] = useState<RestaurantDetails>({
//     _id: "001",
//     categories: [
//       {
//         id: 1,
//         name: "Asian",
//         imageUrl: "",
//       },
//     ],
//     name: "Kinn Thai",
//     address: "3 Crown St, Wollongong",
//     phone: "045678909",
//     averageRating: 4.5,
//     averageWaitTime: 48,
//     description: "Famous thai restaurant in Wollongong.",
//   });

//   const addToMenu = (menuItem: MenuItem) => {
//     setMenu((prevMenu) => [...prevMenu, menuItem]);
//   };

//   const removeFromMenu = (menuItem: MenuItem) => {
//     setMenu(menu.filter((item) => item.id !== menuItem.id));
//   };

//   const editDetail = (key: keyof RestaurantDetails, value: string | number) => {
//     setDetails({ ...details, [key]: value });
//   };

//   const editMenu = (id: string, editedItem: MenuItem) => {
//     const newMenu: MenuItem[] = menu.map((i) => {
//       if (i.id == id) {
//         return editedItem;
//       }
//       return i;
//     });
//     console.log(newMenu);
//     setMenu((prevMenu) => [...newMenu]);
//   };

//   return {
//     menu,
//     addToMenu,
//     removeFromMenu,
//     details,
//     editDetail,
//     editMenu,
//   };
// };