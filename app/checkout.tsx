import CustomButton from "@/components/CustomButton";
import { clearCart } from "@/features/cart/cartSlice";
import { RootState } from "@/store/store";
import {
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

const Checkout = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
    const location = useSelector((state: RootState) => state.user.location);
    const dispatch = useDispatch();
    const cartItemList = Object.values(cartItems);

    const handlePlaceOrder = () => {
        // place order
        dispatch(clearCart());
        router.navigate("/(tabs)/home");
    };

    return (
        <View className="flex-1">
            <ScrollView className="flex-1">
                <View className="p-4">
                    <View className="p-4 bg-white rounded-md gap-3 mb-4">
                        <View className="flex-row items-center gap-2">
                            <FontAwesome5
                                name="map-marker-alt"
                                size={18}
                                color="black"
                            />
                            <Text className="font-psemibold text-lg">
                                Delivery Address
                            </Text>
                            <Text className="font-psemibold text-sm ml-auto">
                                Update
                            </Text>
                        </View>
                        <View className="h-40 rounded-md overflow-hidden border border-neutral-300">
                            <MapView
                                style={{ width: "100%", height: "100%" }}
                                initialRegion={{
                                    latitude: location?.coords?.latitude,
                                    longitude: location?.coords?.longitude,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005,
                                }}
                                provider={PROVIDER_GOOGLE}
                                showsUserLocation
                                showsMyLocationButton={false}
                                showsBuildings={false}
                            />
                        </View>
                        <Text>Gulshan 2, House 529, Rd No. 43</Text>
                    </View>

                    <View className="p-4 bg-white rounded-md gap-3 mb-4">
                        <View className="flex-row items-center gap-2">
                            <FontAwesome
                                name="credit-card"
                                size={18}
                                color="black"
                            />
                            <Text className="font-psemibold text-lg">
                                Payment Method
                            </Text>
                            <Text className="font-psemibold text-sm ml-auto">
                                Change
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <MaterialCommunityIcons
                                name="cash"
                                size={24}
                                color="black"
                            />
                            <Text>Cash</Text>
                            <Text className="ml-auto">
                                ${totalPrice.toFixed(2)}
                            </Text>
                        </View>
                    </View>

                    <View className="p-4 bg-white rounded-md gap-3">
                        <View className="flex-row items-center gap-2">
                            <FontAwesome6
                                name="rectangle-list"
                                size={18}
                                color="black"
                            />
                            <Text className="font-psemibold text-lg">
                                Order Summary
                            </Text>
                        </View>
                        <View className="gap-1.5">
                            {cartItemList.map((item) => {
                                return (
                                    <View
                                        className="flex-row gap-3"
                                        key={`${item.id}`}
                                    >
                                        <Text
                                            numberOfLines={1}
                                            className="flex-1"
                                        >
                                            {item.quantity} x {item.title}
                                        </Text>
                                        <Text>
                                            $
                                            {(
                                                item.quantity * item.price
                                            ).toFixed(2)}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View className="bg-white p-4 gap-2 rounded-t-3xl">
                <View className="flex-row justify-between">
                    <Text className="font-psemibold text-lg">Total</Text>
                    <Text className="font-psemibold text-lg">
                        ${totalPrice.toFixed(2)}
                    </Text>
                </View>
                <CustomButton
                    title="Place Order"
                    handlePress={handlePlaceOrder}
                />
            </View>
        </View>
    );
};

export default Checkout;
