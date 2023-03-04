
/** @name INTERFACE.User */
export interface User {
    id: string;
    username: string;
    nickname?: string;
    phone?: string;
    gender?: string;
    avatar?: string;
    // 状态 0:禁用，1:正常
    status: number;
    // 用户类型 0:管理员，1:普通用户，2:骑手，3:商家
    userType: string;
    createTime: string;
    updateTime: string;
}

/** @name INTERFACE.Shop */
export interface Shop {
    id: string;
    userId: string;
    // 店名
    name: string;
    // 商店评分
    rating: string;
    // 商店月销量
    monthlySale: string;
    // 预计配送时间
    estimatedDeliveryTime: string;
    // 描述
    description: string;
    // 商店种类
    category: string;
    // 商店照片、logo
    photo: string;
}

/** @name INTERFACE.Product */
export interface Product {
    id: string;
    shopId: string;
    // 食物名字
    name: string;
    // 食物价格
    price: string;
    // 食材描述
    description: string;
    // 食物照片
    photo: string;
}

export interface API_Response<T> {
    /* status code */
    code: number;
    data: T;
    msg?: string;
}
