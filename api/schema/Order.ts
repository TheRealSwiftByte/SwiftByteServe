import { Payment, MenuItem, Customer, Restaurant } from "./SwiftByteTypes";


export interface OrderDetails {
    customer: Customer,
    restaurant: Restaurant,
    deliveryInstruction: string,
    deliveryAddress: string,
}

export type Order = {
    id: string
    customerId: string
    restaurant: Restaurant
    foodItems: MenuItem[]
    orderStatus: "pending" | "accepted" | "declined" | "completed" | "cancelled" | "new" | "default" | "delivering" | "pendingDriver" //default is for an errored state, should be deprecated
    totalPrice: number
    orderDate: number
    payment?: Payment
    deliveryInstruction: string
    deliveryAddress: string
}

export type CreateOrderInput = {
    customerId: string
    restaurant: Restaurant
    foodItems: MenuItem[]
    orderStatus: "pending" | "accepted" | "declined" | "completed" | "cancelled" | "new" | "default" | "delivering" | "pendingDriver" //default is for an errored state, should be deprecated
    totalPrice: number
    deliveryInstruction: string
    deliveryAddress: string
    payment?: Payment
}

export type UpdateOrderInput = {
    id?: string
    customerId?: string
    restaurant?: Restaurant
    foodItems?: MenuItem[]
    orderStatus?: "pending" | "accepted" | "declined" | "completed" | "cancelled" | "new" | "default" | "delivering" | "pendingDriver" //default is for an errored state, should be deprecated
    totalPrice?: number
    deliveryInstruction?: string
    deliveryAddress?: string
    payment?: Payment
}