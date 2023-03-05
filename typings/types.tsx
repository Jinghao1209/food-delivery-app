/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
    CompositeScreenProps,
    NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Shop, User } from "./api";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type Unsure<T> = {
    [K in keyof T]?: T[K];
};

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    NotFound: undefined;
    Login: undefined;
    SearchPage: undefined;
    MenuSelection: {
        shop: Shop;
    };

    /* My Space */
    EditAccount: undefined;

    /* Modal */
    Modal: undefined;
    RegisterModal: undefined;
    ResetPasswordModal: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    HomePage: undefined;
    MyMessage: undefined;
    ShoppingCart: undefined;
    MerchantPage: undefined;
    MySpace: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<RootTabParamList, Screen>,
        NativeStackScreenProps<RootStackParamList>
    >;

/** @name INTERFACE.AsyncStorageData */
export interface AsyncStorageData {
    "client.data": Unsure<AsyncStorageUserData>;
}

/** @name INTERFACE.AsyncStorageUserData */
export interface AsyncStorageUserData {
    token: string;
    user: Unsure<User>;
}
