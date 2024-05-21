import { Customer } from './Customer';
import { Restaurant } from './Restaurant';

export type Review = {
    id: string;
    customerId: string;
    restaurantId: string;
    rating: number;
    comment: string;
    createdAt: number;
}

export type CreateReviewInput = {
    customerId: string;
    restaurantId: string;
    rating: number;
    comment: string;
}

export type UpdateReviewInput = {
    customerId?: string;
    restaurantId?: string;
    rating?: number;
    comment?: string;
}