export interface Category {
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
  
  export interface Notification {
    id: string;
    title: string;
    description: string;
    isNew: boolean;
    createdAt: string;
  }
  
  export interface Restaurant {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    menu: MenuItem[];
    categories: Category[];
    address: Address;
    averageRating: number;
  }
  
  export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  export interface Customer {
    id: string,
    name: string;
    email: string;
    phone: string;
  }
  
  export interface Payment {
    id: string;
    amount: number;
    type: 'card' | 'paypal';
    last3Digits?: string;
    datePaid: Date;
  }
  
  export interface Cart {
    id: string;
    restaurant: Restaurant;
    items: MenuItem[];
    promoCode: string;
    netTotal: string;
  }
  
  export interface Card {
    id: number,
    type: string,
    last3Digits: number,
    title: string
  }
  
  export interface Order {
    id: string;
    customer: Customer;
    restaurant: Restaurant;
    items: MenuItem[];
    status: 'pending' | 'accepted' | 'declined' | 'completed';
    total: number;
    tax: number;
    netTotal: number;
    promoCode: string;
    discount: number;
    orderDate: Date;
    payment: Payment;
    deliveryInstruction: string;
    deliveryAddress: string;
    completedAt?: Date;
    eta: Date;
    deliveryPerson: DeliveryPerson;
  }
  
  export interface DeliveryPerson {
    id: string;
    name: string;
    carName: string;
    phone: string;
    avgRating: number;
  }
  
  export const deliverer: DeliveryPerson[] = [
    {
      id: '1',
      name: 'Henry Earls',
      carName: 'Mazda 3 Black',
      phone: '0456736543',
      avgRating: 4.5
    },
    {
      id: '2',
      name: 'John Smith',
      carName: 'Honda HRV White',
      phone: '0456736543',
      avgRating: 4.5
    },
    {
      id: '3',
      name: 'Jason Lee',
      carName: 'Honda HRV White',
      phone: '0456736543',
      avgRating: 4.5
    }
  ]
  
  
  // EXAMPLE DATA
  export const categories: Category[] = [
    {
      id: 1,
      name: 'Seafood',
      imageUrl: 'https://images.pexels.com/photos/566343/pexels-photo-566343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      name: 'Fast Food',
      imageUrl: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      name: 'Japanese',
      imageUrl: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      name: 'Dessert',
      imageUrl: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      name: 'Korean',
      imageUrl: 'https://images.pexels.com/photos/5773968/pexels-photo-5773968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 6,
      name: 'Vegetarian',
      imageUrl: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 7,
      name: 'Fruits',
      imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 8,
      name: 'Snacks',
      imageUrl: 'https://images.pexels.com/photos/298217/pexels-photo-298217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]
  
  export const restaurants: Restaurant[] = [
    {
        id: 1,
        name: 'Kinn Thai',
        categories: [categories[0], categories[1]],
        description: 'Free delivery on order above $35',
        averageRating: 4,
        imageUrl: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        menu: [
            { id: '304', name: 'Margherita Pizza', description: 'Classic tomato sauce, mozzarella, basil', price: 10.99, imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/07/margherita-pizza.jpg' },
            { id: '305', name: 'Pepperoni Pizza', description: 'Tomato sauce, mozzarella, pepperoni slices', price: 12.99, imageUrl: "https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg" },
            // More menu items...
        ],
        address: {
            street: '456 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001'
        }
    },
    {
        id: 2,
        name: 'Diggies',
        categories: [categories[4], categories[7]],
        averageRating: 4.1,
        description: 'Free delivery on order above $20. Free Ice Cream during public holiday',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSuSukk8gKjQvpguurAbU340D8Qw7U7jINgdKWpZXsZA&s',
        menu: [
            { id: '201', name: 'California Roll', description: 'Crab, avocado, cucumber, and sesame seeds', price: 8.99, imageUrl: 'https://norecipes.com/wp-content/uploads/2019/12/best-california-roll-004.jpg' },
            { id: '202', name: 'Spicy Tuna Roll', description: 'Tuna, spicy mayo, cucumber, and tobiko', price: 9.99, imageUrl: 'https://tastesbetterfromscratch.com/wp-content/uploads/2023/01/Spicy-Tuna-Roll-15.jpg' },
            // More menu items...
        ],
        address: {
            street: '789 Elm St',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90001'
        }
    },
    {
      id: 3,
      name: 'Hong Kong Chef',
      categories: [categories[4]],
      averageRating: 4.6,
      description: 'Free delivery on order above $20. Free Ice Cream during public holiday',
      imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/14/29/52/54/hong-teh-chinese-restaurant.jpg',
      menu: [
          { id: '208', name: 'Crispy Tofu', description: 'Crab, avocado, cucumber, and sesame seeds', price: 8.99, imageUrl: 'https://norecipes.com/wp-content/uploads/2019/12/best-california-roll-004.jpg' },
          { id: '209', name: 'Spicy Beef Rice', description: 'Tuna, spicy mayo, cucumber, and tobiko', price: 9.99, imageUrl: 'https://tastesbetterfromscratch.com/wp-content/uploads/2023/01/Spicy-Tuna-Roll-15.jpg' },
          // More menu items...
      ],
      address: {
          street: '789 Elm St',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001'
      }
  },
  ];
  
  export const menuItems: MenuItem[] = [
    {
      id: '100',
      name: 'Cheeseburger',
      description: 'Juicy beef patty with melted cheese, lettuce, and tomato on a sesame seed bun.',
      price: 8.99,
      imageUrl: 'https://images.pexels.com/photos/2983098/pexels-photo-2983098.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '101',
      name: 'Chicken Caesar Salad',
      description: 'Fresh romaine lettuce topped with grilled chicken breast, parmesan cheese, and Caesar dressing.',
      price: 10.49,
      imageUrl: 'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '102',
      name: 'Margherita Pizza',
      description: 'Classic Italian pizza topped with tomato sauce, fresh mozzarella, and basil leaves.',
      price: 12.99,
      imageUrl: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '103',
      name: 'Chocolate Brownie Sundae',
      description: 'Warm chocolate brownie topped with vanilla ice cream, whipped cream, and chocolate sauce.',
      price: 6.99,
      imageUrl: 'https://images.pexels.com/photos/5386659/pexels-photo-5386659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  
  export const items: MenuItem[] = [
    menuItems[1], 
    menuItems[3], 
    menuItems[2], 
    menuItems[1],
    menuItems[0], 
    menuItems[0], 
    menuItems[2], 
    menuItems[0]
  ]
  
  export const cart: Cart = {
    id: '987654321',
    restaurant: restaurants[1],
    items: items,
    promoCode: 'FREESHIP',
    netTotal: '15'
  };
  
  export const promoCode = [
    {code: 'SPRING30', value: 4},
    {code: 'AUTUMN22', value: 2.5},
    {code: 'JOY2024', value: 5},
    {code: 'NYC234', value: 2}
  ]
  
  export const myCards: Card[] = [
    {
      id: 1,
      type: 'visa',
      last3Digits: 4567,
      title: ''
    },
    {
      id: 2,
      type: 'master',
      last3Digits: 7890,
      title: 'Credit Card'
    },
    {
      id: 3,
      type: 'paypal',
      last3Digits: 2345,
      title: 'Paypal'
    }
  ]
  
  export const customers: Customer[] = [
    {
      id: '1',
      name: 'Celine Husen',
      phone: '0456987576',
      email: 'cel@sb.com'
    },
    {
      id: '2',
      name: 'Jenny Do',
      phone: '0456987576',
      email: 'jen@sb.com'
    }
  ]
  
  export const payment: Payment = {
    id: '1',
    amount: 84,
    type: 'card',
    last3Digits: '456',
    datePaid: new Date()
  }
  
  export const orders: Order[] = [
    {
      id: 'SBE1',
      customer: customers[0],
      restaurant: restaurants[0],
      items: [restaurants[0].menu[0], restaurants[0].menu[1]],
      status: 'accepted',
      total: 80,
      tax: 8,
      netTotal: 88,
      promoCode: 'SPRING30',
      discount: 4,
      orderDate: new Date(),
      payment,
      deliveryInstruction: 'Leave at the door',
      deliveryAddress: '1 Daisy Street, Fairy Meadow, NSW 2519',
      eta: new Date(),
      deliveryPerson: deliverer[0],
    },
    {
      id: 'SBE2',
      customer: customers[0],
      restaurant: restaurants[2],
      items: [restaurants[2].menu[0], restaurants[2].menu[1]],
      status: 'completed',
      total: 88,
      tax: 8,
      netTotal: 88,
      promoCode: 'SPRING30',
      discount: 4,
      orderDate: new Date(),
      payment,
      deliveryInstruction: 'Leave at the door',
      deliveryAddress: '1 Daisy Street, Fairy Meadow, NSW 2519',
      eta: new Date(),
      deliveryPerson: deliverer[1],
      completedAt: new Date()
    },
    {
      id: 'SBE3',
      customer: customers[0],
      restaurant: restaurants[1],
      items: [restaurants[1].menu[0], restaurants[1].menu[1]],
      status: 'completed',
      total: 26,
      tax: 8,
      netTotal: 88,
      promoCode: 'SPRING30',
      discount: 4,
      orderDate: new Date(),
      payment,
      deliveryInstruction: 'Leave at the door',
      deliveryAddress: '1 Daisy Street, Fairy Meadow, NSW 2519',
      eta: new Date(),
      deliveryPerson: deliverer[2],
      completedAt: new Date()
    },
    {
      id: 'SBE4',
      customer: customers[0],
      restaurant: restaurants[1],
      items: [restaurants[1].menu[0], restaurants[1].menu[1]],
      status: 'pending',
      total: 30,
      tax: 8,
      netTotal: 88,
      promoCode: 'SPRING30',
      discount: 4,
      orderDate: new Date(),
      payment,
      deliveryInstruction: 'Leave at the door',
      deliveryAddress: '1 Daisy Street, Fairy Meadow, NSW 2519',
      eta: new Date(),
      deliveryPerson: deliverer[2],
      completedAt: new Date()
    },
    {
      id: 'SBE5',
      customer: customers[0],
      restaurant: restaurants[1],
      items: [restaurants[1].menu[0], restaurants[1].menu[1]],
      status: 'pending',
      total: 30,
      tax: 8,
      netTotal: 88,
      promoCode: 'SPRING30',
      discount: 4,
      orderDate: new Date(),
      payment,
      deliveryInstruction: 'Leave at the door',
      deliveryAddress: '1 Daisy Street, Fairy Meadow, NSW 2519',
      eta: new Date(),
      deliveryPerson: deliverer[2],
      completedAt: new Date()
    },
    {
      id: 'SBE6',
      customer: customers[0],
      restaurant: restaurants[1],
      items: [restaurants[1].menu[0], restaurants[1].menu[1]],
      status: 'declined',
      total: 50,
      tax: 12,
      netTotal: 45,
      promoCode: 'SPRING30',
      discount: 4,
      orderDate: new Date(),
      payment,
      deliveryInstruction: 'Leave at the door',
      deliveryAddress: '1 Daisy Street, Fairy Meadow, NSW 2519',
      eta: new Date(),
      deliveryPerson: deliverer[2],
      completedAt: new Date()
    },
  ]
  
  export const notifications = [
    {
      id: '1',
      title: 'Your order has arrived',
      description: 'Please contact with the driver to receive the order',
      createdAt: new Date().toLocaleString(),
      isNew: false,
    },
    {
      id: '2',
      title: "Don't forget to rate the restaurant!",
      description: 'Lorem ipsum dolor anet',
      createdAt: new Date().toLocaleString(),
      isNew: true,
    },
  
  ]

  export const categories_data: Category[] = [
    {
      id: 1,
      name: 'Seafood',
      imageUrl: 'https://images.pexels.com/photos/566343/pexels-photo-566343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      name: 'Fast Food',
      imageUrl: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      name: 'Japanese',
      imageUrl: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      name: 'Dessert',
      imageUrl: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      name: 'Korean',
      imageUrl: 'https://images.pexels.com/photos/5773968/pexels-photo-5773968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 6,
      name: 'Vegetarian',
      imageUrl: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 7,
      name: 'Thailand',
      imageUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 8,
      name: 'Snacks',
      imageUrl: 'https://images.pexels.com/photos/298217/pexels-photo-298217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]