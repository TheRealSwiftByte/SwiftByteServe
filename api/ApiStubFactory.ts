
import { Restaurant, Order, Review, Customer, Cart, MenuItem } from './schema/SwiftByteTypes.ts';

import { ApiImplementationFactory } from './ApiImplementationFactory.ts';

export class ApiStubFactory implements ApiImplementationFactory {
    private carts: Cart[];
    private customers: Customer[];
    private orders: Order[];
    private Restaurants: Restaurant[];
    private reviews: Review[];

    constructor() {
        this.carts = [];
        this.customers = [];
        this.orders = [];
        this.Restaurants = [];
        this.reviews = [];
    }

    //Restaurants
    getRestaurant(id: string): Promise<Restaurant> {
        const Restaurant = this.Restaurants.find(v => v.id === id);
        if (Restaurant) {
            return Promise.resolve(Restaurant);
        }
        return Promise.reject("Restaurant not found");
    }
    getRestaurants(): Promise<Restaurant[]> {
        return Promise.resolve(this.Restaurants);
    }
    createRestaurant(Restaurant: Restaurant): Promise<Restaurant> {
        this.Restaurants.push(Restaurant);
        return Promise.resolve(Restaurant);
    }

    //orders
    getOrder(id: string): Promise<Order> {
        const order = this.orders.find(o => o.id === id);
        if (order) {
            return Promise.resolve(order);
        }
        return Promise.reject("Order not found");
    }
    getOrders(customer: Customer): Promise<Order[]> {
        return Promise.resolve(this.orders.filter(o => o.customer.id === customer.id));
    }
    createOrder(order: Order): Promise<Order> {
        this.orders.push(order);
        return Promise.resolve(order);
    }
    updateOrder(order: Order): Promise<Order> {
        const index = this.orders.findIndex(o => o.id === order.id);
        if (index !== -1) {
            this.orders[index] = order;
            return Promise.resolve(order);
        }
        return Promise.reject("Order not found");
    }

    //customers
    getCustomer(id: string): Promise<Customer> {
        const customer = this.customers.find(c => c.id === id);
        if (customer) {
            return Promise.resolve(customer);
        }
        return Promise.reject("Customer not found");
    }
    getCustomers(): Promise<Customer[]> {
        return Promise.resolve(this.customers);
    }
    createCustomer(customer: Customer): Promise<Customer> {
        this.customers.push(customer);
        return Promise.resolve(customer);
    }
    updateCustomer(customer: Customer): Promise<Customer> {
        const index = this.customers.findIndex(c => c.id === customer.id);
        if (index !== -1) {
            this.customers[index] = customer;
            return Promise.resolve(customer);
        }
        return Promise.reject("Customer not found");
    }

    //reviews
    getReview(id: string): Promise<Review> {
        const review = this.reviews.find(r => r.id === id);
        if (review) {
            return Promise.resolve(review);
        }
        return Promise.reject("Review not found");
    }
    getReviews(): Promise<Review[]> {
        return Promise.resolve(this.reviews);
    }
    createReview(review: Review): Promise<Review> {
        this.reviews.push(review);
        return Promise.resolve(review);
    }
    updateReview(review: Review): Promise<Review> {
        const index = this.reviews.findIndex(r => r.id === review.id);
        if (index !== -1) {
            this.reviews[index] = review;
            return Promise.resolve(review);
        }
        return Promise.reject("Review not found");
    }

    //cart
    getCart(id: string): Promise<Cart> {
        const cart = this.carts.find(c => c.id === id);
        if (cart) {
            return Promise.resolve(cart);
        }
        return Promise.reject("Cart not found");
    }
    addToCart(cartId: string, itemId: string): Promise<Cart> {
        const cart = this.carts.find(c => c.id === cartId);
        if (cart) {
            const item = cart.foodItems.find(i => i.id === itemId);
            if (item) {
                cart.foodItems.push(item);
                return Promise.resolve(cart);
            }
            return Promise.reject("Item not found");
        }
        return Promise.reject("Cart not found");
    }
    removeFromCart(cartId: string, itemId: string): Promise<Cart> {
        const cart = this.carts.find(c => c.id === cartId);
        if (cart) {
            const item = cart.foodItems.find(i => i.id === itemId);
            if (item) {
                cart.foodItems = cart.foodItems.filter(i => i.id !== itemId);
                return Promise.resolve(cart);
            }
            return Promise.reject("Item not found");
        }
        return Promise.reject("Cart not found");
    }

}