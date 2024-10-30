import { Text, View } from "react-native";

import ProductList from "@/components/ProductList";
import { useGetCartQuery } from "@/services/cartApi";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setLocation } from "@/features/user/userSlice";

const Home = () => {
    useGetCartQuery(1);
    const location = useSelector((state: RootState) => state.user.location);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            dispatch(setLocation(location));
        })();
    }, [dispatch]);

    return (
        <View className="flex-1">
            <ProductList />
            {/* <Text>Timestamp: </Text> */}
        </View>
    );
};

export default Home;
