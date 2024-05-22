
import { Restaurant } from './SwiftByteTypes';

export enum MenuItemType {
    MAIN = "main",
    SIDE = "side",
    DRINK = "drink",
    STARTER = "starter",
    DESSERT = "dessert",
    POPULAR = "popular",
}

export type MenuItem = {
    id: string;
    category: MenuItemType;
    name: string;
    price: number;
    description: string;
    imagePath: string;
    isAvailable: boolean;
}