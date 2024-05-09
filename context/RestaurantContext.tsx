import React, { createContext, useState, useContext } from 'react';

export interface FoodCategory {
  id: number;
  name: string;
  imageUrl: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface RestaurantDetails {
  _id: string;
  categories: FoodCategory[];
  name: string;
  address: string;
  phone: string;
  averageRating: number;
  averageWaitTime: number;
  description: string;
}

interface RestaurantContextType {
  menu: MenuItem[];
  addToMenu: (menuItem: MenuItem) => void;
  removeFromMenu: (menuItem: MenuItem) => void;
  details: RestaurantDetails;
  editDetail: (key: keyof RestaurantDetails, value: string | number) => void;
}

const RestaurantContext = createContext<RestaurantContextType>({
  menu: [],
  addToMenu: () => {},
  removeFromMenu: () => {},
  details: {
    _id: '001',
    categories: [{
      id: 1,
      name: 'Asian',
      imageUrl: ''
    }],
    name: 'Kinn Thai',
    address: '3 Crown St, Wollongong',
    phone: '045678909',
    averageRating: 4.5,
    averageWaitTime: 48,
    description: 'Famous thai restaurant in Wollongong.'
  },
  editDetail: () => {}
});

// Create a custom hook to consume the context
export const useRestaurantContext = () => useContext(RestaurantContext);

// Create a provider component
export const RestaurantProvider: React.FC = ({ children } : any) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [details, setDetails] = useState<RestaurantDetails>({
    _id: '',
    categories: [],
    name: '',
    address: '',
    phone: '',
    averageRating: 0,
    averageWaitTime: 0,
    description: ''
  });

  const addToMenu = (menuItem: MenuItem) => {
    setMenu([...menu, menuItem]);
  };

  const removeFromMenu = (menuItem: MenuItem) => {
    setMenu(menu.filter(item => item.id !== menuItem.id));
  };

  const editDetail = (key: keyof RestaurantDetails, value: string | number) => {
    setDetails({ ...details, [key]: value });
  };

  return (
    <RestaurantContext.Provider
      value={{
        menu,
        addToMenu,
        removeFromMenu,
        details,
        editDetail
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
