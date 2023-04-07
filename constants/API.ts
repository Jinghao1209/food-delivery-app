// @ts-ignore
import { BASE_URL } from "@env";

const GET_MAPPING = {
    /**
     * @example API.GET_SHOPS
     * @description `API.GET_SHOPS` as original get all shops
     * @example API.GET_SHOPS + `category`
     * @description if filter by category
     */
    GET_SHOPS: `${BASE_URL}/api/anonymous/shops/`,
    /**
     * @requires PARAMS `shop_id`
     * @example API.GET_PRODUCTS + `shop_id`
     */
    GET_PRODUCTS: `${BASE_URL}/api/anonymous/products/`,
    /**
     * @requires PERMISSION `system:merchant` | `system:admin`
     * @requires PARAMS `userId`
     * @example API.GET_SHOP_BY_USER_ID + `userId`
     */
    GET_SHOP_BY_USER_ID: `${BASE_URL}/api/merchant/shops/`,
    /**
     * @requires PARAMS `userId`
     * @example API.GET_AVATAR + `userId`
     */
    GET_AVATAR: `${BASE_URL}/api/user/avatar/`,
    /**
     * @requires PARAMS `userId`
     * @example API.GET_USER + `userId`
     */
    GET_USER: `${BASE_URL}/api/user/`,
};

const POST_MAPPING = {
    /**
     * @requires POST_BODY: { `username`: `string`; `password`: `string` }
     */
    POST_LOGIN: `${BASE_URL}/api/anonymous/auth/login/`,
    POST_LOGOUT: `${BASE_URL}/api/logout/`,
    /**
     * @requires PERMISSION `system:merchant` | `system:admin`
     * @requires POST_BODY `INTERFACE.Product` & `{ shopId: string }`
     * @see `INTERFACE.Product`
     */
    POST_ADD_PRODUCT: `${BASE_URL}/api/merchant/product/`,
    /**
     * @requires POST_BODY `FORM_DATA<{ id: userID, file: { uri: DATA_URI, type: 'image/jpeg', name: 'avatar.jpg' } }>`
     * @see `FormData`
     */
    POST_AVATAR: `${BASE_URL}/api/user/upload-avatar/`,
    /**
     * @requires POST_BODY `INTERFACE.User`
     * @requires PARAMS `roleId`
     * @see `INTERFACE.User`
     */
    POST_REGISTER: `${BASE_URL}/api/anonymous/register/`,
    /**
     * @requires PERMISSION `system:merchant` | `system:admin`
     * @requires POST_BODY `Shop` & `{ userId: string }`
     * @see `INTERFACE.Shop`
     */
    POST_ADD_SHOP: `${BASE_URL}/api/merchant/shop/`,
};

const PUT_MAPPING = {
    /**
     * @requires PERMISSION `system:merchant` | `system:admin`
     * @requires PUT_BODY `INTERFACE.Product` & `{ shopId & productId }`
     * @see `INTERFACE.Product`
     */
    PUT_UPDATE_PRODUCT: `${BASE_URL}/api/merchant/product/`,
    /**
     * @requires PERMISSION `system:merchant` | `system:admin`
     * @requires PUT_BODY `INTERFACE.Shop` & `{ shopId: string }`
     * @see `INTERFACE.Shop`
     */
    PUT_UPDATE_SHOP_BY_ID: `${BASE_URL}/api/merchant/shop/`,
    /**
     * @requires PUT_BODY `INTERFACE.User`
     * @see `INTERFACE.User`
     */
    PUT_UPDATE_USER: `${BASE_URL}/api/user/`,
};

const DELETE_MAPPING = {
    /**
     * @requires PERMISSION `system:merchant` | `system:admin`
     * @requires PARAMS `productId`
     * @example API.DELETE_PRODUCT + `productId`
     */
    DELETE_PRODUCT: `${BASE_URL}/api/merchant/product/`,
    /**
     * @requires PERMISSION `system:merchant` | `system:admin`
     * @requires PARAMS `shopId`
     * @example API.DELETE_SHOP + `shopId`
     */
    DELETE_SHOP: `${BASE_URL}/api/merchant/shop/`,
    /**
     * @requires PARAMS `userId`
     * @example API.DELETE_USER + `userId`
     */
    DELETE_USER: `${BASE_URL}/api/user/`,
};

export default {
    ...GET_MAPPING,
    ...POST_MAPPING,
    ...PUT_MAPPING,
    ...DELETE_MAPPING,
};
