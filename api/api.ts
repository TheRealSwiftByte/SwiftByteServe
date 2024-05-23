import { ApiImplementationFactory } from './ApiImplementationFactory';
import { ApiStubFactory } from './ApiStubFactory';
import { ApiProdFactory } from './ApiProdFactory';
import { Customer, Order, Review, Restaurant } from './schema/SwiftByteTypes';
import { CreateCustomerInput } from './schema/Customer';
import { UpdateOrderInput } from './schema/Order';
import { CreateRestaurantInput } from './schema/Restaurant';

export class Api implements ApiImplementationFactory {
    private static _api: Api;
    private factory: ApiImplementationFactory;

    private activeRestaurant: Restaurant | undefined;


    async getOrdersByRestaurantId(restaurantId: string): Promise<Order[] | undefined> {
        return this.factory.getOrdersByRestaurantId(restaurantId);
    }
    getActiveRestaurant(): Restaurant {
        if (Api.getApi().activeRestaurant === undefined) throw new Error("No active customer");
        return Api.getApi().activeRestaurant || {} as Restaurant;
    }
    setActiveRestaurant(restaurant: Restaurant): void {
        Api.getApi().activeRestaurant = restaurant;
    }

    constructor() {
        this.factory = new ApiProdFactory();
    }

    public static getApi(): Api {
        if (!Api._api) {
            Api._api = new Api();
        }
        return Api._api;
    }

    //Restaurants
    async signInRestaurant(email: string, password: string): Promise<Restaurant>{
        return this.factory.signInRestaurant(email, password);
    }
    public getRestaurant(id: string) {
        return this.factory.getRestaurant(id);
    }
    public getRestaurants() {
        return this.factory.getRestaurants();
    };
    public createRestaurant(Restaurant: CreateRestaurantInput){
        return this.factory.createRestaurant(Restaurant);
    }
    public updateRestaurant(restaurant: Restaurant) {
        return this.factory.updateRestaurant(restaurant);
    }

    //orders
    public getOrder(id: string) {
        return this.factory.getOrder(id);
    }
    public getOrders(customerId: string): Promise<Order[] | undefined>{
        return this.factory.getOrders(customerId);
    }
    public createOrder(order: Order) {
        return this.factory.createOrder(order);
    }
    public updateOrder(order: UpdateOrderInput) {
        return this.factory.updateOrder(order);
    }

    //customers
  
    public getCustomer(id: string) {
        return this.factory.getCustomer(id);
    }
    public getCustomers() {
        return this.factory.getCustomers();
    }
    public createCustomer(customer: CreateCustomerInput): Promise<Customer> {
        return this.factory.createCustomer(customer);
    }
    public updateCustomer(customer: Customer) {
        return this.factory.updateCustomer(customer);
    }

    //reviews
    public getReview(id: string) {
        return this.factory.getReview(id);
    }
    public getReviews(restaurantId: string) {
        return this.factory.getReviews(restaurantId);
    }
    public createReview(review: Review) {
        return this.factory.createReview(review);
    }
    public updateReview(review: Review) {
        return this.factory.updateReview(review);
    }

    
    
}