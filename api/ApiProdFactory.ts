import { ApiImplementationFactory } from "./ApiImplementationFactory";
import { Api } from "./api.ts";
import { CreateCustomerInput } from "./schema/Customer.ts";
import { UpdateOrderInput } from "./schema/Order.ts";
import { CreateRestaurantInput, UpdateRestaurantInput } from "./schema/Restaurant.ts";
import {Restaurant, Order, Customer, Review} from "./schema/SwiftByteTypes.ts";


const API_BASE_URL = "https://hffwzvbzod.execute-api.ap-southeast-2.amazonaws.com/prod/"

export class ApiProdFactory implements ApiImplementationFactory {

    getActiveRestaurant(): Restaurant | undefined {
        throw new Error("Method not implemented. (you shouldnt be here tho, getActiveRestaurant in ApiProdFactory)");
    }

    //Restaurants
    async getRestaurant(id: string): Promise<Restaurant | undefined>{
        try {
            return fetch(API_BASE_URL + "restaurant/?id=" + id)
                .then(response => response.json())
                .then(data => {
                    console.log("Data returned in request to getRestaurant: " + JSON.stringify(data));
                    return data as Restaurant;
                });
        } catch (e){
            console.error("Failed to get restaurant");
            return undefined;
        }
    };

    async getOrdersByRestaurantId(restaurantId: string): Promise<Order[] | undefined>{
        try {
            const response = await fetch(API_BASE_URL + "restaurant/fetch/?id=" + restaurantId);
            const data = await response.json();
            console.log("Data returned in request to getOrders: " + JSON.stringify(data));
            for (const order of data) {
                order.restaurant = await this.getRestaurant(order.restaurantId);
            }
            return data as Order[];
        } catch (e) {
            console.error("Failed to get orders: " + e);
            return undefined;
        }
    }

    async getRestaurants(): Promise<Restaurant[] | undefined>{
        //stub
        return undefined;
    }
    async signInRestaurant(email: string, password: string): Promise<Restaurant> {
        const restaurant = await fetch(API_BASE_URL + "restaurant/SignIn?email=" + email + "&password=" + password)
            .then(response => response.json())
            .then(data => {
                console.log("Data returned in request to signInRestaurant: " + JSON.stringify(data));
                Api.getApi().setActiveRestaurant(data as Restaurant);
                return data as Restaurant;
            });
    return restaurant;
}
    async createRestaurant(restaurantInput: CreateRestaurantInput): Promise<Restaurant>{
        restaurantInput.menu = []
        restaurantInput.categories = [];
        const response = fetch(API_BASE_URL + "restaurant/", {
            method: 'POST',
            body: JSON.stringify(restaurantInput),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            console.log("Data returned in request to createRestaurant: " + JSON.stringify(data));
            Api.getApi().setActiveRestaurant(data as Restaurant);
            return data as Restaurant;
        });
        return response;
    };

    async updateRestaurant(restaurant: Restaurant): Promise<Restaurant | undefined>{
        const val:UpdateRestaurantInput = {
            name: restaurant.name,
            categories: restaurant.categories?? [],
            address: restaurant.address?? '',
            phone: restaurant.phone,
            averageRating: restaurant.averageRating?? 0,
            averageWaitTime: restaurant.averageWaitTime?? 0,
            description: restaurant.description?? '',
            imageURI: restaurant.imageURI
        }
        console.log('val', val);
        try {
            const response = fetch(API_BASE_URL + "restaurant/?id=" + Api.getApi().getActiveRestaurant()?.id, {
                method: 'PUT',
                body: JSON.stringify(val),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(() =>{
                Api.getApi().setActiveRestaurant({
                    ...Api.getApi().getActiveRestaurant(),
                    ...restaurant
                })
            })
        } catch (error) {
            console.log(typeof error)
            console.error("Failed to update restaurant: " + error);
            return undefined;
        }
    }

    //orders
    async getOrder(id: string): Promise<Order | undefined>{
        try {
            return fetch(API_BASE_URL + "order/?id=" + id)
                .then(response => response.json())
                .then(data => {
                    console.log("Data returned in request to getOrder: " + JSON.stringify(data));
                    return data as Order;
                });
        } catch (e){
            console.error("Failed to get order");
            return undefined;
        }
    };
    async getOrders(customerId: string): Promise<Order[] | undefined>{ 
        try {
            const response = await fetch(API_BASE_URL + "order/fetch/?id=" + customerId);
            const data = await response.json();
            console.log("Data returned in request to getOrders: " + JSON.stringify(data));
            for (const order of data) {
                order.restaurant = await this.getRestaurant(order.restaurantId);
            }
            return data as Order[];
        } catch (e) {
            console.error("Failed to get orders: " + e);
            return undefined;
        }
    };
    async createOrder(order: Order): Promise<boolean>{
        try {
            throw new Error("Method not implemented.")
        } catch (error) {
            console.error("Failed to create order: " + error);
            return false;
        }
    };
    async updateOrder(order: UpdateOrderInput): Promise<boolean>{
        try {
            const result = await fetch(API_BASE_URL + "order/id?=" + order.id, {
                method: 'PUT',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Result of request to update order: " + JSON.stringify(result));
            return true
        } catch (error) {
            console.error("Failed to update order: " + error);
            return false;
        }
    }
    
    //customers
    async getCustomer(id: string): Promise<Customer | undefined>{
        try {
            throw new Error("Method not implemented.")
        } catch (error) {
            console.error("Failed to get customer: " + error);
            return undefined;
        }
    };
    getCustomers(): Promise<Customer[]>{
        throw new Error("Method not implemented.");
    }; //possibly unnecessary

    async createCustomer(customerInput: CreateCustomerInput): Promise<Customer>{
        customerInput.cart = {
            foodItems: [],
            totalPrice: 0
        };
        const response = fetch(API_BASE_URL + "customer/", {
            method: 'POST',
            body: JSON.stringify(customerInput),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            console.log("Data returned in request to createCustomer: " + JSON.stringify(data));
            Api.getApi().setActiveRestaurant(data as Restaurant); //dw about this ;)
            return data as Customer;
        });
        return response;
    }


    async updateCustomer(customer: Customer): Promise<boolean>{
        try {
            throw new Error("Method not implemented.")
        } catch (error) {
            console.error("Failed to update customer: " + error);
            return false;
        }
    }

    //reviews
    async getReview(id: string): Promise<Review | undefined>{
        try {
            throw new Error("Method not implemented.")
        } catch (error) {
            console.error("Failed to get review: " + error);
            return undefined;
        }
    };

    async getReviews(): Promise<Review[] | undefined>{
        try {
            throw new Error("Method not implemented.")
        } catch (error) {
            console.error("Failed to get reviews: " + error);
            return undefined;
        }
    }

    async createReview(review: Review): Promise<boolean>{
        try {
            throw new Error("Method not implemented.")

        } catch (error) {
            console.error("Failed to create review: " + error);
            return false;
        }
    }

    async updateReview(review: Review): Promise<boolean>{
        try {
            throw new Error("Method not implemented.")
        } catch (error) {
            console.error("Failed to update review: " + error);
            return false;
        }
    }
}