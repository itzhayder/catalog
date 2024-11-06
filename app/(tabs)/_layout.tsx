import { RootState } from "@/store/store";
import { Entypo } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

type TTabIcon = {
    icon: "home" | "shopping-cart";
    color: string;
    name: string;
    focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TTabIcon) => {
    return (
        <View className="flex items-center justify-center">
            <Entypo name={icon} size={24} color={color} />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabLayout = () => {
    const totalQuantity = useSelector(
        (state: RootState) => state.cart.totalQuantity,
    );

    return (
        <View className="flex-1">
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "black",
                    tabBarStyle: {
                        height: 60,
                        // borderTopRightRadius: 18,
                        // borderTopLeftRadius: 18,
                    },
                    tabBarBadgeStyle: {
                        backgroundColor: "#FE724C",
                        color: "white",
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerTitleAlign: "center",
                        headerTitle: "Home",
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon="home"
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="cart"
                    options={{
                        tabBarBadge: totalQuantity || undefined,
                        title: "Cart",
                        headerTitleAlign: "center",
                        headerTitle: "Cart",
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon="shopping-cart"
                                color={color}
                                name="Cart"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
};

export default TabLayout;
