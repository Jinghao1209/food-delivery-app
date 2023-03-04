import { Product, Shop } from "./api";

/** @name INTERFACE.CartItemsData */
export interface CartItemsData {
    product: Product;
    count: number;
}

/** @name TYPE.CartData */
export type CartData = {
    /* shop id */
    [K in string]: {
        items: CartItemsData[],
        shop: Shop;
    };
};
