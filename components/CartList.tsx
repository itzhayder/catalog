import { Button, FlatList, RefreshControl, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetCartQuery } from "@/services/cartApi";
import CartItem from "./CartItem";
import { Link, router } from "expo-router";
import CustomButton from "./CustomButton";

const CartList = () => {
    const { isLoading, isFetching, refetch } = useGetCartQuery(1);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

    const cartItemList = Object.values(cartItems);
    // const totalPrice = cartItemList.reduce((acc, curr) => {
    //     return acc + curr.quantity * curr.price;
    // }, 0);

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1">
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(item) => `${item.id}`}
                data={cartItemList}
                contentContainerClassName="gap-4 p-4"
                renderItem={({ item }) => {
                    return <CartItem item={item} />;
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={refetch}
                    />
                }
                // ListFooterComponentClassName="bg-red-200"
                // ListFooterComponentStyle={{ backgroundColor: "red" }}
                ListEmptyComponent={
                    <View className="flex-1 justify-center gap-4">
                        <Text className="font-psemibold text-2xl text-center">
                            You have no items in your shopping cart.
                        </Text>
                        <Link
                            href="/(tabs)/home"
                            className="p-4 bg-primary rounded-md"
                            asChild
                        >
                            <Text className="text-center font-psemibold text-white">
                                Browse Products
                            </Text>
                        </Link>
                    </View>
                }
            />
            {/* <Link href="/checkout" className="p-4 bg-violet-400" asChild>
                <Button title="Checkout" onPress={() => null} />
            </Link> */}
            {cartItemList.length > 0 && (
                <View className="bg-white p-4 gap-2 rounded-t-3xl">
                    <View className="flex-row justify-between">
                        <Text className="font-psemibold text-lg">Total</Text>
                        <Text className="font-psemibold text-lg">
                            ${totalPrice.toFixed(2)}
                        </Text>
                    </View>
                    <CustomButton
                        title="Checkout"
                        handlePress={() => {
                            router.push("/checkout");
                        }}
                    />
                </View>
            )}
        </View>
    );
};

export default CartList;
