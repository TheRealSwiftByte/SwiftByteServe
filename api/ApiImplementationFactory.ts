
import { CreateCustomerInput, UpdateCustomerInput } from "./schema/Customer.ts";
import { UpdateOrderInput } from "./schema/Order.ts";
import { UpdateRestaurantInput } from "./schema/Restaurant.ts";
import { UpdateReviewInput } from "./schema/Review.ts";
import {Customer, Order, Review, Restaurant} from "./schema/SwiftByteTypes.ts";

export interface ApiImplementationFactory {
    //Restaurants
    getRestaurant(id: string): Promise<Restaurant | undefined>;
    getRestaurants(): Promise<Restaurant[] | undefined>;
    createRestaurant(Restaurant: UpdateRestaurantInput): Promise<boolean>;

    //orders
    getOrder(id: string): Promise<Order | undefined>;
    getOrders(customerId: string): Promise<Order[] | undefined>;
    createOrder(order: Order): Promise<boolean>;
    updateOrder(order: UpdateOrderInput): Promise<boolean>;

    //customers
    signInCustomer(email: string, password: string): Promise<Customer>;
    getActiveCustomer(): Customer | undefined;
    getCustomer(id: string): Promise<Customer | undefined>;
    getCustomers(): Promise<Customer[] | undefined>; //possibly unnecessary
    createCustomer(customerInput: CreateCustomerInput): Promise<Customer>;
    updateCustomer(customer: UpdateCustomerInput): Promise<boolean>;

    //reviews
    getReview(id: string): Promise<Review | undefined>;
    getReviews(): Promise<Review[] | undefined>;
    createReview(review: Review): Promise<boolean>;
    updateReview(review: UpdateReviewInput): Promise<boolean>;
}