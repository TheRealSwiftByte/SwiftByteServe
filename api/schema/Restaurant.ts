import { MenuItem } from "./SwiftByteTypes";

enum FoodCategory {
    KOREAN = "korean",
    JAPANESE = "japanese",
    VIETNAMESE = "vietnamese",
    CHINESE = "chinese",
    THAI = "thai",
    INDIAN = "indian",
    MIDDLE_EASTERN = "middle eastern",
    MEDITERRANEAN = "mediterranean",
    ITALIAN = "italian",
    VEGAN = "vegan",
    EASTERN = "eastern",
    WESTERN = "western",
    ASIAN = "asian",
    CHICKEN = "chicken",
    BURGER = "burger",
    PIZZA = "pizza",
}

export type Restaurant = {
    id: string;
    categories: FoodCategory[];
    name: string;
    address: string;
    phone: string;
    averageRating?: number;
    averageWaitTime?: number;
    description: string;
    menu: MenuItem[];
}

export type CreateRestaurantInput = {
    name: string;
    address: string;
    phone: string;
    description: string;
    menu: MenuItem[];
    categories?: FoodCategory[];
    averageRating?: number;
    averageWaitTime?: number;
}

export type UpdateRestaurantInput = {
    name?: string;
    address?: string;
    phone?: string;
    description?: string;
    menu?: MenuItem[];
    categories?: FoodCategory[];
    averageRating?: number;
    averageWaitTime?: number;
}