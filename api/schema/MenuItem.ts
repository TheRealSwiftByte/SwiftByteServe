
import { Restaurant } from './SwiftByteTypes';

enum MenuItemType {
    MAIN = "main",
    SIDE = "side",
    DRINK = "drink",
    STARTER = "starter",
    DESSERT = "dessert",
    POPULAR = "popular",
}

export type MenuItem = {
    category: MenuItemType;
    name: string;
    price: number;
    description: string;
    imagePath: string;
    isAvailable: boolean;
}