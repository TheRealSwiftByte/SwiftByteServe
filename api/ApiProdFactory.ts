import { ApiImplementationFactory } from "./ApiImplementationFactory";
import { Api } from "./api.ts";
import { CreateCustomerInput } from "./schema/Customer.ts";
import { UpdateOrderInput } from "./schema/Order.ts";
import {Restaurant, Order, Customer, Review} from "./schema/SwiftByteTypes.ts";


const API_BASE_URL = "https://hffwzvbzod.execute-api.ap-southeast-2.amazonaws.com/prod/"

export class ApiProdFactory implements ApiImplementationFactory {

    getActiveCustomer(): Customer | undefined {
        throw new Error("Method not implemented. (you shouldnt be here tho, getActiveCustomer in ApiProdFactory)");
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

    async getRestaurants(): Promise<Restaurant[] | undefined>{
        //stub
        return undefined;
    }
    async createRestaurant(Restaurant: Restaurant): Promise<boolean>{
        //stub
        return false;
    };

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
    
    async signInCustomer(email: string, password: string): Promise<Customer> {
            const customer = await fetch(API_BASE_URL + "customer/SignIn?email=" + email + "&password=" + password)
                .then(response => response.json())
                .then(data => {
                    console.log("Data returned in request to signInCustomer: " + JSON.stringify(data));
                    Api.getApi().setActiveCustomer(data as Customer);
                    return data as Customer;
                });
            return customer;
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
            Api.getApi().setActiveCustomer(data as Customer);
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