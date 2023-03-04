import { create } from "zustand";
import axios from "axios";

import { CartData, CartItemsData } from "../typings/store";
import { Shop } from "../typings/api";

export const useCartStore = create<{
    data: CartData;
    setData: (data: CartData) => Promise<void>;
    setAllData: (token: string | undefined) => Promise<void>;
    addData: (data: CartItemsData, shop: Shop) => Promise<void>;
}>((set, get) => ({
    data: {},
    async setData(data) {
        set({ data });
    },
    async setAllData(token) {
        // TODO: if have token, get cart from backend
        if (!token) set({ data: {} });
    },
    async addData(data, shop) {
        let oldData = get().data;
        if (Object.hasOwn(oldData, shop.id)) {
            let find = oldData[shop.id].items.find(
                (t) => t.product.id === data.product.id
            );
            if (find) {
                find.count++;
            } else {
                oldData[shop.id].items.push(data);
            }
        } else {
            oldData[shop.id] = {
                items: [data],
                shop: shop,
            };
        }

        /**
         * @example
         * set({ data: oldData });
         * @description this will failed to update state, use `Object.assign({}, oldData)` will create
         */
        set({ data: Object.assign({}, oldData) });
    },
}));
