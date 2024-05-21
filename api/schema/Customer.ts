
import { Cart } from "./SwiftByteTypes";

export type Customer = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    address?: string;
    cart: Cart;
}

export type CreateCustomerInput = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    address?: string;
    cart?: Cart;
}

export type UpdateCustomerInput = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    address?: string;
    cart?: Cart;
}